import Header from '@/components/Header/Header';
import HeaderArea from '@/components/HeaderArea';
import { ThemeProvider } from '@/components/theme-provider';

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <main className="container m-auto w-full h-screen bg-white dark:bg-[#111827]">
        {/* ------------------------------------------- */}
        {/* Page Wrapper */}
        {/* ------------------------------------------- */}
        <div className="w-full mx-auto flex-grow relative overflow-hidden">
          {/* ------------------------------------------- */}
          {/* Header */}
          {/* ------------------------------------------- */}
          <Header />
          <HeaderArea />
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          {children}
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </div>
      </main>
    </ThemeProvider>
  );
}
