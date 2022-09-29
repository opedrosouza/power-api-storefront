import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Unauthenticated from '../components/Layout/Unauthenticated';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <h1 className="text-3xl font-bold">
      Welcome to the Power Contact Testing App
    </h1>
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

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Unauthenticated>
      {page}
    </Unauthenticated>
  )
}

export default Home;
