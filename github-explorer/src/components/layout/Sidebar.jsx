import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bookmark, Star, GitFork, Eye, X, Sparkles } from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const nav = [
    { name: 'Dashboard', href: '/',         icon: Home,       gradient: 'from-blue-500 to-purple-600' },
    { name: 'Bookmarks', href: '/bookmarks',icon: Bookmark,   gradient: 'from-yellow-500 to-orange-500' }
  ];

  const stats = [
    { label: 'Total Stars', value: '2.1K', icon: Star,     color: 'text-yellow-500' },
    { label: 'Total Forks', value: '847',  icon: GitFork,  color: 'text-blue-500'  },
    { label: 'Watching',    value: '156',  icon: Eye,      color: 'text-green-500' }
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <div className={`
        fixed lg:sticky lg:top-0 inset-y-0 left-0 w-80 h-screen
        backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border-r border-white/20
        shadow-2xl z-50 lg:z-auto overflow-y-auto transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* mobile header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 lg:hidden">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Menu
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* navigation */}
        <nav className="p-4 space-y-3">
          {nav.map(({ name, href, icon: Icon, gradient }) => {
            const active = location.pathname === href;
            return (
              <Link
                key={name}
                to={href}
                onClick={onClose}
                className={`
                  group relative flex items-center px-4 py-3 rounded-2xl font-medium transition
                  ${active
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/20'}
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {name}
              </Link>
            );
          })}

          {/* quick stats */}
          <div className="mt-10">
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
              Quick Stats
            </h3>
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center px-4 py-3 rounded-2xl hover:bg-white/10">
                <Icon className={`w-4 h-4 mr-3 ${color}`} />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
