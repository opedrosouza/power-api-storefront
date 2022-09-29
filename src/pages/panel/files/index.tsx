import type { GetServerSideProps } from 'next';
import { getAPIClient } from '../../../services/axios';
import { parseCookies } from 'nookies';
import { NextPageWithLayout } from '../../_app';
import Authenticated from '../../../components/Layout/Authenticated';
import ContactFile from '../../../interfaces/ContactFile';
import Link from 'next/link';

type ContactsFileType = {
  files: ContactFile[];
}

const PanelContactsFilesPage: NextPageWithLayout<ContactsFileType> = ({ files }) => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Files</h2>
        <Link href='/panel/files/upload' passHref={true}>
          <a
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload new file
          </a>
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {JSON.stringify(files)}
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

  const contacts = await apiClient.get('/contact_files')

  return {
    props: { contacts: contacts.data as ContactFile[] }
  }
}

PanelContactsFilesPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Authenticated>
      {page}
    </Authenticated>
  );
}

export default PanelContactsFilesPage;
