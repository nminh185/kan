import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LineChart, Home, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Layout() {
  const { isAdmin } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
                <LineChart className="h-6 w-6 mr-2" />
                <span className="font-semibold">Crypto Signals</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="p-2 text-gray-600 hover:text-gray-900">
                <Home className="h-5 w-5" />
              </Link>
              {isAdmin() && (
                <Link to="/stats" className="p-2 text-gray-600 hover:text-gray-900">
                  <Settings className="h-5 w-5" />
                </Link>
              )}
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}