import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Menu, X, Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const Header = ({ toggleSidebar, sidebarOpen }) => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useLocalStorage('gh-explorer-dark', false);

  // Apply dark mode on component mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle the toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', current: location.pathname === '/' },
    { name: 'Bookmarks', href: '/bookmarks', current: location.pathname === '/bookmarks' }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              aria-label="Toggle sidebar"
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <Link to="/" className="flex items-center ml-4 lg:ml-0">
              <Github className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                GitHub Explorer
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  item.current
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
