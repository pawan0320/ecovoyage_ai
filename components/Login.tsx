
import React, { useState } from 'react';
import { ViewState, UserRole } from '../types';
import { useAuth } from './AuthContext';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  Globe, ShieldCheck, Building2, User, Landmark, 
  AlertCircle, Sun, Moon, Languages, CheckCircle
} from 'lucide-react';

interface Props {
  onLoginSuccess: (view: ViewState) => void;
}

type Theme = 'light' | 'dark';
type Language = 'EN' | 'ES' | 'JP';

export const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  const { login } = useAuth(); // Use global auth context
  const [role, setRole] = useState<UserRole>('TOURIST');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // UX State
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('EN');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email.includes('@') || password.length < 6) {
        setError('Invalid credentials. Password must be at least 6 characters.');
        setIsLoading(false);
        return;
    }

    try {
        // Authenticate via Global Context
        await login(email, role);
        
        // Determine redirect based on role
        let targetView: ViewState;
        switch (role) {
            case 'BUSINESS': targetView = ViewState.BUSINESS; break;
            case 'GOV': targetView = ViewState.GOV; break;
            default: targetView = ViewState.TOURIST;
        }
        
        onLoginSuccess(targetView);
    } catch (err) {
        setError("Login failed. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const getRoleIcon = (r: UserRole) => {
    switch (r) {
      case 'BUSINESS': return <Building2 className="w-4 h-4" />;
      case 'GOV': return <Landmark className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] flex ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Left Side: Branding & Trust */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40"
          role="img"
          aria-label="Scenic landscape showing nature and tourism harmony"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 to-slate-900/90"></div>
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-teal-500 rounded-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">EcoVoyage AI</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-6">
              One Identity for <br/> <span className="text-teal-400">Smart Tourism</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-md">
              Log in once to access Hotels, Transport, Government Services, and Payments. A unified ecosystem for seamless travel.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
              <ShieldCheck className="w-8 h-8 text-teal-400" />
              <div>
                <p className="font-semibold">Central Authentication Service (CAS)</p>
                <p className="text-xs text-slate-400">Single Sign-On (SSO) Protected</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
              <p className="text-xs text-teal-400 font-mono">SYSTEM OPERATIONAL • v3.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 lg:p-24 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
        
        {/* Top Controls */}
        <div className="absolute top-6 right-6 flex gap-4">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <div className="relative group">
            <button className={`flex items-center gap-1 p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
              <Languages className="w-5 h-5" />
              <span className="text-sm font-medium">{lang}</span>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-slate-100 hidden group-hover:block z-20">
              {['EN', 'ES', 'JP'].map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l as Language)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
                >
                  {l === 'EN' ? 'English' : l === 'ES' ? 'Español' : '日本語'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md space-y-8 mx-auto">
          <div className="text-center lg:text-left">
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Welcome Back</h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Sign in with your unified ID.</p>
          </div>

          {/* Role Selector */}
          <div className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} p-1 rounded-xl grid grid-cols-3 gap-1`}>
            {(['TOURIST', 'BUSINESS', 'GOV'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  role === r 
                    ? `${theme === 'dark' ? 'bg-slate-600 text-white shadow-sm' : 'bg-white text-teal-700 shadow-sm ring-1 ring-slate-200'}`
                    : `${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`
                }`}
              >
                {getRoleIcon(r)}
                <span className="capitalize">{r === 'GOV' ? 'Gov' : r.toLowerCase()}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Email / Mobile</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    type="text"
                    required
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all ${
                      theme === 'dark' 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-transparent' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-transparent'
                    }`}
                    placeholder="email or mobile"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Password / OTP</label>
                  <a href="#" className="text-xs font-medium text-teal-600 hover:text-teal-500">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all ${
                      theme === 'dark' 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-transparent' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-transparent'
                    }`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-teal-500/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying Identity...
                </>
              ) : (
                <>
                  Secure Login <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500'}`}>Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'border-slate-600 hover:bg-slate-700 text-slate-300' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.04-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button type="button" className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'border-slate-600 hover:bg-slate-700 text-slate-300' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}>
                 <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.79.04 1.73-.61 3.29-.68 2.08-.09 3.66 1.48 3.66 1.48s-2.03 1.14-2.07 4.14c-.03 2.92 2.36 4.16 2.41 4.19-.03.13-.36 1.25-1.09 2.32-.77 1.12-1.57 2.21-2.91 2.22l-1.37.01zM12.03 5.31c-.96 1.24-2.54 1.83-3.96 1.75.11-1.45.98-2.93 1.95-3.8 1.01-.94 2.81-1.66 3.93-1.51.09 1.5-.96 2.76-1.92 3.56z"/></svg>
                 <span className="text-sm font-medium">Apple</span>
              </button>
            </div>
          </form>

          <div className="text-center text-sm space-y-2">
             <div className={theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}>
              Don't have an account?{' '}
              <button 
                onClick={() => onLoginSuccess(ViewState.SIGNUP)}
                className="text-teal-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
              By signing in, you agree to our <a href="#" className="hover:underline">Terms</a> and <a href="#" className="hover:underline">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
