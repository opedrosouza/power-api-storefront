import type { GetServerSideProps } from 'next';
import { getAPIClient } from '../../../services/axios';
import { parseCookies } from 'nookies';
import { NextPageWithLayout } from '../../_app';
import Authenticated from '../../../components/Layout/Authenticated';
import Contact from '../../../interfaces/Contact';

type ContactsPageType = {
  contacts: Contact[];
}

const PanelContactsPage: NextPageWithLayout<ContactsPageType> = (contacts) => {
  return (
    <div className="">
      <h2 className="text-lg leading-6 font-medium text-gray-900">Contacts</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {JSON.stringify(contacts)}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { 'power_contact_token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const contacts = await apiClient.get('/contacts')

  return {
    props: { contacts: contacts.data as Contact[] }
  }
}

PanelContactsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Authenticated>
      {page}
    </Authenticated>
  );
}

export default PanelContactsPage;
