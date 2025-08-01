import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { Doctors } from '@/pages/Doctors';
import { Patients } from '@/pages/Patients';
import { Appointments } from '@/pages/Appointments';
import { Documents } from '@/pages/Documents';
import { Profile } from '@/pages/Profile';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const currentUser = {
    name: 'Dr. Emily Carter',
    email: 'emily.carter@cliniccenter.com',
    avatar: ''
  };

  const handleProfileClick = () => {
    setActiveSection('profile');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'doctors':
        return <Doctors />;
      case 'patients':
        return <Patients />;
      case 'appointments':
        return <Appointments />;
      case 'documents':
        return <Documents />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onProfileClick={handleProfileClick}
        onLogout={onLogout}
        currentUser={currentUser}
      />

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main Content */}
      <main className={cn(
        "pt-16 transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};