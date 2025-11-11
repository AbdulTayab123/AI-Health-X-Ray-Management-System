import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { DoctorPage } from './components/DoctorPage';
import { RadiologistPage } from './components/RadiologistPage';
import { NursingPage } from './components/NursingPage';
import { PatientPage } from './components/PatientPage';
import { AITechnologyPage } from './components/AITechnologyPage';
import { ReportsPage } from './components/ReportsPage';
import { ContactPage } from './components/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const renderPage = () => {
    if (isAdminMode) {
      return <AdminDashboard onBackToMain={() => setIsAdminMode(false)} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onAccessAdmin={() => setIsAdminMode(true)} />;
      case 'doctor':
        return <DoctorPage />;
      case 'radiologist':
        return <RadiologistPage />;
      case 'nursing':
        return <NursingPage />;
      case 'patient':
        return <PatientPage />;
      case 'ai-technology':
        return <AITechnologyPage />;
      case 'reports':
        return <ReportsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onAccessAdmin={() => setIsAdminMode(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {!isAdminMode && (
        <Navbar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          theme={theme}
          toggleTheme={toggleTheme}
          setShowLoginModal={setShowLoginModal}
          onAccessAdmin={() => setIsAdminMode(true)}
        />
      )}
      {renderPage()}
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      <Toaster />
    </div>
  );
}
