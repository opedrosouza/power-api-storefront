import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { NextPageWithLayout } from './_app';
import Unauthenticated from '../components/Layout/Unauthenticated';
import ImageComponent from '../components/Utils/Image';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

type Inputs = {
  email: string;
  password: string;
}

const Login: NextPageWithLayout = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { signIn } = useContext(AuthContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    return await signIn(data);
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <ImageComponent
          className="mx-auto h-12 w-auto"
          wrapperClasses="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login into your Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          or{' '}
          <Link href='/register' passHref={true}>
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Create a free Account right now
            </a>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" method='post' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  name='email'
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register('password')}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'power_contact_token': token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/panel',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Unauthenticated>
      {page}
    </Unauthenticated>
  );
}

export default Login;
