import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Dashboard from './components/Dashboard';
import { Header } from './components/Header';

const ThemedApp: React.FC = () => {
  const { state } = useAppContext();
  const { theme } = state;

  useEffect(() => {
    const root = document.documentElement;
    // Set CSS variables for colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    // Handle background image
    const bgElement = document.getElementById('app-background');
    const bgOverlayElement = document.getElementById('app-background-overlay');
    
    if (bgElement && bgOverlayElement) {
      if (theme.backgroundImage) {
        bgElement.style.backgroundImage = `url(${theme.backgroundImage})`;
        bgOverlayElement.style.backdropFilter = `blur(${theme.blur}px)`;
        bgOverlayElement.style.backgroundColor = `rgba(var(--color-bg-base), ${theme.dim})`;
      } else {
        bgElement.style.backgroundImage = 'none';
        bgOverlayElement.style.backdropFilter = 'none';
        bgOverlayElement.style.backgroundColor = 'transparent';
      }
    }
    
    // Cleanup function to revoke blob URL on change or unmount
    return () => {
      if (theme.backgroundImage && theme.backgroundImage.startsWith('blob:')) {
        URL.revokeObjectURL(theme.backgroundImage);
      }
    }

  }, [theme]);

  return (
    <div className="min-h-screen font-sans">
      <div id="app-background" className="fixed inset-0 -z-10 bg-cover bg-center transition-all duration-500">
        <div id="app-background-overlay" className="absolute inset-0 transition-all duration-500"></div>
      </div>
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-2xl mx-auto">
          <Dashboard />
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ThemedApp />
    </AppProvider>
  );
};

export default App;