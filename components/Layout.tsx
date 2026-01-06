
import React from 'react';
import { ViewState } from '../types';
import { useAuth } from './AuthContext';
import { Menu, X, Globe, UserCircle, Search, Leaf, Shield, User as UserIcon, LogOut, Settings, Bed } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Layout: React.FC<Props> = ({ children, activeView, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);

  const navItems = [
    { id: ViewState.LANDING, label: 'Home', icon: <Globe className="w-4 h-4"/> },
    { id: ViewState.STAYS, label: 'Stays', icon: <Bed className="w-4 h-4"/> },
    { id: ViewState.SEARCH, label: 'Explore', icon: <Search className="w-4 h-4"/> },
    { id: ViewState.ECO, label: 'Sustainability', icon: <Leaf className="w-4 h-4"/> },
    // Conditionally show dashboard based on user role
    ...(isAuthenticated && user?.activeRole === 'TOURIST' ? [{ id: ViewState.TOURIST, label: 'Dashboard', icon: <UserIcon className="w-4 h-4"/> }] : []),
    ...(isAuthenticated && user?.activeRole === 'BUSINESS' ? [{ id: ViewState.BUSINESS, label: 'Biz Panel', icon: <Shield className="w-4 h-4"/> }] : []),
    ...(isAuthenticated && user?.activeRole === 'GOV' ? [{ id: ViewState.GOV, label: 'Gov Control', icon: <Shield className="w-4 h-4"/> }] : []),
  ];

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    onNavigate(ViewState.LANDING);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate(ViewState.LANDING)}>
              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-2 rounded-lg text-white mr-2">
                 <Globe className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
                EcoVoyage
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeView === item.id
                      ? 'bg-teal-50 text-teal-700 shadow-sm'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              
              <div className="h-6 w-px bg-slate-200 mx-2"></div>

              {/* Auth Button or Profile Dropdown */}
              {!isAuthenticated ? (
                <button
                  onClick={() => onNavigate(ViewState.LOGIN)}
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition flex items-center gap-2 shadow-lg shadow-slate-900/20"
                >
                  <UserCircle className="w-4 h-4" />
                  Sign In
                </button>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition"
                  >
                    {user?.avatar ? (
                        <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt={user.name} />
                    ) : (
                        <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                        {user?.name[0]}
                        </div>
                    )}
                    <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                  </button>

                  {isProfileDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsProfileDropdownOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-20 animate-fade-in-up">
                        <div className="px-4 py-2 border-b border-slate-100">
                            <p className="text-xs font-bold text-slate-400 uppercase">Signed in as</p>
                            <p className="text-sm font-bold text-slate-800 truncate">{user?.email}</p>
                            <p className="text-xs text-teal-600 font-medium capitalize">{user?.activeRole}</p>
                        </div>
                        <button 
                          onClick={() => { onNavigate(ViewState.PROFILE); setIsProfileDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4 text-slate-400" /> Settings & Profile
                        </button>
                         <button 
                          onClick={() => { onNavigate(ViewState.ADMIN); setIsProfileDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Shield className="w-4 h-4 text-slate-400" /> Admin Demo
                        </button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                    activeView === item.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <div className="border-t border-slate-100 my-2"></div>
              {isAuthenticated ? (
                  <>
                    <button
                        onClick={() => { onNavigate(ViewState.PROFILE); setIsMenuOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50"
                    >
                        Profile & Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                    >
                        Sign Out
                    </button>
                  </>
              ) : (
                  <button
                    onClick={() => { onNavigate(ViewState.LOGIN); setIsMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-900 hover:bg-slate-50"
                  >
                    Sign In
                  </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-white mb-4">
                     <Globe className="h-6 w-6 text-teal-500" />
                     <span className="font-bold text-lg">EcoVoyage AI</span>
                </div>
                <p className="text-sm max-w-xs leading-relaxed">
                    Building the future of sustainable tourism through artificial intelligence and community collaboration.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-teal-400">Smart Search</a></li>
                    <li><a href="#" className="hover:text-teal-400">Carbon Calculator</a></li>
                    <li><a href="#" className="hover:text-teal-400">Business Portal</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-teal-400">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-teal-400">Sustainability Pledge</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-xs text-center md:text-left">
            © 2024 EcoVoyage AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
