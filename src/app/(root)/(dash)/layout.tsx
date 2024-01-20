import Header from '@/components/Dashboard_ui/Header/Header';
import Sidebar from '@/components/Dashboard_ui/Sidebar/Sidebar';

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen bg-white dark:bg-[#111827]">
      {/* ------------------------------------------- */}
      {/* Page Wrapper */}
      {/* ------------------------------------------- */}

      <Sidebar />
      {/* ------------------------------------------- */}
      {/* Header */}

      {/* ------------------------------------------- */}
      <Header />
      {/* ------------------------------------------- */}
      {/* PageContent */}
      {/* ------------------------------------------- */}
      {/* ------------------------------------------- */}
      {/* Page Route */}
      {/* ------------------------------------------- */}
      <div className="w-full mx-auto flex-grow">
        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
          {children}
        </div>{' '}
      </div>
      {/* ------------------------------------------- */}
      {/* End Page */}
      {/* ------------------------------------------- */}
    </main>
  );
}
