import React, { useState } from 'react';
import { Landing } from './Landing';
import { Login } from './Login';
import { Register } from './Register';
import { MainLayout } from '@/components/layout/MainLayout';

type AppState = 'landing' | 'login' | 'register' | 'app';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');

  const handleLogin = (email: string, password: string) => {
    // Simulate login process
    console.log('Login:', { email, password });
    setCurrentState('app');
  };

  const handleRegister = (userData: any) => {
    // Simulate registration process
    console.log('Register:', userData);
    setCurrentState('app');
  };

  const handleLogout = () => {
    setCurrentState('landing');
  };

  switch (currentState) {
    case 'landing':
      return (
        <Landing
          onNavigateToLogin={() => setCurrentState('login')}
          onNavigateToRegister={() => setCurrentState('register')}
        />
      );
    case 'login':
      return (
        <Login
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentState('register')}
        />
      );
    case 'register':
      return (
        <Register
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentState('login')}
        />
      );
    case 'app':
      return <MainLayout onLogout={handleLogout} />;
    default:
      return null;
  }
};

export default Index;
