import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/api';
import { toast } from 'react-toastify';

interface User {
  id: string;
  email: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData extends SignInData {
  password_confirmation: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'power_contact_token': token } = parseCookies();

    if (token) {
      setToken(token);
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const data = await api.post('/login', {
      user: { email, password }
    });

    if (data.status == 200) {
      const token = data.headers['authorization'];
      setToken(token);
      setCookie(undefined, 'power_contact_token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      api.defaults.headers.common['Authorization'] = token;
      Router.push('/panel')
    } else {
      notify('error');
    }
  }

  const signOut = async () => {
    try {
      await api.delete('/logout');
      destroyCookie(undefined, 'power_contact_token');
      Router.push('/');
      setToken(null);
    } catch (error) {
      throw error;
    }
  }

  const signUp = async ({ email, password, password_confirmation }: SignUpData) => {
    const data = await api.post('/register', {
      user: { email, password, password_confirmation }
    });

    if (data.status == 201) Router.push('/login');
    if (data.status != 201) notify('error');
  }

  const notify = (kind: string) => {
    if (kind == 'error') return toast.error("Something went wrong, try again.");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
