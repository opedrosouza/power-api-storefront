import { useState } from 'react';
import {
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import DesktopSidebar from '../DesktopSidebar';
import Header from '../Header';
import MobileSidebar from '../MobileSidebar';
import PageHeader from '../PageHeader';

interface PanelLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/panel', icon: HomeIcon, current: true },
  { name: 'Contacts', href: '/panel/contacts', icon: UserGroupIcon, current: false },
  { name: 'Files', href: '/panel/files', icon: DocumentReportIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const PanelLayout: React.FC<PanelLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-full">
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
          classNames={classNames}
          secondaryNavigation={secondaryNavigation}
        />
        <DesktopSidebar
          navigation={navigation}
          classNames={classNames}
          secondaryNavigation={secondaryNavigation}
        />
        <div className="lg:pl-64 flex flex-col flex-1">
          <Header
            setSidebarOpen={setSidebarOpen}
            classNames={classNames}
          />
          <main className="flex-1 pb-8">
            {/* <PageHeader /> */}
            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default PanelLayout;
