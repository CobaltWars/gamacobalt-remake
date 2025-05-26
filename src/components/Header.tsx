import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children, className }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      } ${className || ''}`}
    >
      {children}
    </Link>
  );
};

interface HeaderProps {
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">GamaCobalt</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <NavLink to="/" active={currentPath === '/'}>
              Accueil
            </NavLink>
            <NavLink to="/jeux" active={currentPath === '/jeux'}>
              Jeux
            </NavLink>
            <NavLink to="/logiciels" active={currentPath === '/logiciels'}>
              Logiciels
            </NavLink>
            <NavLink 
              to="/gldf" 
              active={currentPath === '/gldf'}
              className="bg-gray-800 text-white hover:bg-gray-700 hover:text-white"
            >
              GLDF
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
