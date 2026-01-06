import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  Mail, Lock, User, Building2, Landmark, ArrowRight, Loader2, 
  CheckCircle2, UploadCloud, ShieldAlert, ArrowLeft, Smartphone
} from 'lucide-react';

interface Props {
  onNavigate: (view: ViewState) => void;
}

type Step = 'ROLE' | 'DETAILS' | 'VERIFY' | 'PREFERENCES' | 'SUCCESS';
type UserRole = 'TOURIST' | 'BUSINESS' | 'GOV';

export const Signup: React.FC<Props> = ({ onNavigate }) => {
  const [step, setStep] = useState<Step>('ROLE');
  const [role, setRole] = useState<UserRole>('TOURIST');
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    inviteCode: '',
    otp: ''
  });

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('DETAILS');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API validation
    setTimeout(() => {
      setLoading(false);
      setStep('VERIFY');
    }, 800);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'TOURIST') {
        setStep('PREFERENCES');
      } else {
        setStep('SUCCESS');
      }
    }, 1000);
  };

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Join EcoVoyage</h2>
        <p className="text-slate-500 mt-2">Choose your account type to get started.</p>
      </div>
      
      <div className="grid gap-4">
        <button 
          onClick={() => handleRoleSelect('TOURIST')}
          className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all group text-left"
        >
          <div className="p-3 bg-teal-50 text-teal-600 rounded-lg group-hover:bg-teal-100 transition-colors">
            <User className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-slate-800">Tourist</h3>
            <p className="text-sm text-slate-500">Plan eco-friendly trips & earn rewards.</p>
          </div>
          <ArrowRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-teal-500" />
        </button>

        <button 
          onClick={() => handleRoleSelect('BUSINESS')}
          className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group text-left"
        >
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-slate-800">Business</h3>
            <p className="text-sm text-slate-500">Manage bookings & view analytics.</p>
          </div>
          <ArrowRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-blue-500" />
        </button>

        <button 
          onClick={() => handleRoleSelect('GOV')}
          className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all group text-left"
        >
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
            <Landmark className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-slate-800">Government</h3>
            <p className="text-sm text-slate-500">City monitoring & crowd control.</p>
          </div>
          <ArrowRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-purple-500" />
        </button>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <button onClick={() => onNavigate(ViewState.LOGIN)} className="text-teal-600 font-medium hover:underline">
            Log in here
          </button>
        </p>
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <form onSubmit={handleDetailsSubmit} className="space-y-5 animate-fade-in">
      <div className="flex items-center mb-6">
        <button type="button" onClick={() => setStep('ROLE')} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 ml-2">
          {role === 'BUSINESS' ? 'Business Details' : role === 'GOV' ? 'Official Access' : 'Create Account'}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" required 
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            placeholder="John Doe"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {role === 'BUSINESS' ? 'Work Email' : role === 'GOV' ? 'Official Gov Email' : 'Email Address'}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              type="email" required 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="name@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        {role === 'BUSINESS' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="text" required 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="Eco Resort Ltd."
                value={formData.businessName}
                onChange={e => setFormData({...formData, businessName: e.target.value})}
              />
            </div>
          </div>
        )}

        {role === 'GOV' && (
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Access Key / Invite Code</label>
            <div className="relative">
              <ShieldAlert className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="text" required 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none font-mono"
                placeholder="GOV-XXXX-XXXX"
                value={formData.inviteCode}
                onChange={e => setFormData({...formData, inviteCode: e.target.value})}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input 
              type="password" required 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="mt-2 flex gap-1">
             <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
             <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
             <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">Strength: Good</p>
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'} <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );

  const renderVerify = () => (
    <form onSubmit={handleVerifySubmit} className="space-y-6 animate-fade-in text-center">
       <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
         {role === 'BUSINESS' ? <UploadCloud className="w-8 h-8" /> : <Smartphone className="w-8 h-8" />}
       </div>
       
       <h2 className="text-2xl font-bold text-slate-900">
         {role === 'BUSINESS' ? 'Verify Business' : 'Verify Email'}
       </h2>
       
       <p className="text-slate-500 text-sm">
         {role === 'BUSINESS' 
           ? 'Please upload your business license or registration document for verification.' 
           : `We sent a 4-digit code to ${formData.email}. Enter it below.`}
       </p>

       {role === 'BUSINESS' ? (
         <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-teal-500 transition-colors cursor-pointer bg-slate-50">
           <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
           <p className="text-sm font-medium text-slate-700">Click to upload document</p>
           <p className="text-xs text-slate-400">PDF, JPG or PNG (Max 5MB)</p>
         </div>
       ) : (
         <div className="flex justify-center gap-3">
           {[1, 2, 3, 4].map((_, i) => (
             <input key={i} type="text" maxLength={1} className="w-12 h-14 text-center text-2xl font-bold border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
           ))}
         </div>
       )}

       <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (role === 'BUSINESS' ? 'Submit for Review' : 'Verify Code')}
      </button>
    </form>
  );

  const renderPreferences = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="text-center mb-6">
         <h2 className="text-2xl font-bold text-slate-900">Customize Experience</h2>
         <p className="text-slate-500 text-sm mt-1">Select topics you care about.</p>
       </div>

       <div className="grid grid-cols-2 gap-3">
          {['Eco-Travel', 'Luxury', 'Budget', 'Adventure', 'History', 'Foodie'].map(pref => (
            <label key={pref} className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
              <span className="text-sm font-medium text-slate-700">{pref}</span>
            </label>
          ))}
       </div>

       <button onClick={() => setStep('SUCCESS')} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all mt-4">
         Complete Setup
       </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center animate-fade-in space-y-6 py-8">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Account Created!</h2>
        <p className="text-slate-500 mt-2">
          {role === 'BUSINESS' || role === 'GOV' 
            ? 'Your account is pending approval. We will notify you via email.' 
            : 'Welcome to EcoVoyage. Your journey begins now.'}
        </p>
      </div>
      <button 
        onClick={() => onNavigate(role === 'TOURIST' ? ViewState.TOURIST : ViewState.LANDING)}
        className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg transition-all hover:bg-slate-800"
      >
        {role === 'TOURIST' ? 'Go to Dashboard' : 'Back to Home'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
       {/* Left Brand Panel */}
       <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/90 to-slate-900/80"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Join the <br/><span className="text-teal-400">Sustainable Revolution</span></h1>
            <p className="text-slate-300 text-lg">Connect with millions of conscious travelers and world-class organizations.</p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-lg"><CheckCircle2 className="w-5 h-5 text-teal-400" /></div>
              <div>
                <h4 className="font-bold">AI-Powered Insights</h4>
                <p className="text-sm text-slate-400">Real-time analytics for better decision making.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="p-2 bg-white/10 rounded-lg"><CheckCircle2 className="w-5 h-5 text-teal-400" /></div>
               <div>
                <h4 className="font-bold">Verified Community</h4>
                <p className="text-sm text-slate-400">Join a trusted network of validated entities.</p>
              </div>
            </div>
          </div>
       </div>

       {/* Right Form Panel */}
       <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            {step === 'ROLE' && renderRoleSelection()}
            {step === 'DETAILS' && renderDetailsForm()}
            {step === 'VERIFY' && renderVerify()}
            {step === 'PREFERENCES' && renderPreferences()}
            {step === 'SUCCESS' && renderSuccess()}
         </div>
       </div>
    </div>
  );
};
