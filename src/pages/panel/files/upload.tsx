import type { GetServerSideProps } from 'next';
import { api } from '../../../services/api';
import { parseCookies } from 'nookies';
import { NextPageWithLayout } from '../../_app';
import Authenticated from '../../../components/Layout/Authenticated';
import ContactFile from '../../../interfaces/ContactFile';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';



const PanelContactsFilesUploadPage: NextPageWithLayout = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter();
  const [file, setFile] = useState<any>();

  const onSubmit = async (data: any) => {
    const form = document.querySelector('#csvUploadForm');
    const formData = new FormData();
    formData.append('csv_file', file);
    console.log(file)
    console.log(formData);
    const profileData = await api.post('/contact_files', { contact_file: {...formData} });

  }

  return (
    <div className="">
      <h2 className="text-lg leading-6 font-medium text-gray-900">File Upload</h2>
      <div className="mt-2">
      <form id='csvUploadForm' className="space-y-6" method='post' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="csv_file" className="block text-sm font-medium text-gray-700">
            Select the csv file to upload
          </label>
          <div className="mt-1">
            <input
              {...register('csv_file')}
              id="csv_file"
              type="file"
              name='csv_file'
              autoComplete="csv_file"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                // @ts-ignore: Object is possibly 'null'.
                setFile(e?.target?.files[0]);
              }}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'power_contact_token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

PanelContactsFilesUploadPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Authenticated>
      {page}
    </Authenticated>
  );
}

export default PanelContactsFilesUploadPage;
