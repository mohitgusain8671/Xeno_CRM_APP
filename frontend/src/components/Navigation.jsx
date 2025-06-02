import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Target,
  Home,
  Users,
  BarChart3,
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAppStore } from '../store';

const Navigation = () => {
  const { userInfo, logout } = useAppStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/audience', label: 'Audience', icon: Users },
    { path: '/campaigns', label: 'Campaigns', icon: BarChart3 },
    { path: '/my-campaigns', label: 'My Campaigns', icon: MessageSquare }
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-500 mr-3" />
              <span className="text-xl font-bold text-white">CampaignCraft</span>
            </div>

            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink key={path} to={path} className={linkClass}>
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {
              userInfo ? 
              (<div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                >
                  <img
                    src={userInfo?.avatar}
                    alt={userInfo?.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="hidden md:block">{userInfo?.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">
                      <div className="font-medium">{userInfo?.name}</div>
                      <div className="text-gray-400">{userInfo?.email}</div>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div> ) : (
                <NavLink
                  to="/login"
                  className={`${linkClass} md:ml-4 text-white `}
                >
                  Login
                </NavLink>
              )
            }

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={mobileLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
