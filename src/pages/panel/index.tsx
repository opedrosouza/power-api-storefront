import type { GetServerSideProps } from 'next';
import { getAPIClient } from '../../services/axios';
import { parseCookies } from 'nookies';
import { ScaleIcon } from '@heroicons/react/outline';
import { NextPageWithLayout } from '../_app';
import Authenticated from '../../components/Layout/Authenticated';

const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
]

const PanelHomePage: NextPageWithLayout = () => {
  return (
    <div className="">
      <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {cards.map((card) => (
          <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href={card.href} className="font-medium text-cyan-700 hover:text-cyan-900">
                  View all
                </a>
              </div>
            </div>
          </div>
        ))}
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

  return {
    props: {}
  }
}

PanelHomePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Authenticated>
      {page}
    </Authenticated>
  );
}

export default PanelHomePage;
