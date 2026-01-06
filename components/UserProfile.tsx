import React, { useState } from 'react';
import { 
  User, MapPin, CreditCard, Bell, Lock, Shield, 
  Plane, Utensils, Accessibility, Leaf, Save, Camera 
} from 'lucide-react';

export const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'PREFERENCES' | 'SETTINGS'>('PROFILE');
  const [isSaving, setIsSaving] = useState(false);

  // Mock State for Profile Data
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    homeAirport: 'JFK - New York',
    bio: 'Avid hiker and eco-conscious traveler seeking hidden gems.'
  });

  // Mock State for Travel DNA
  const [preferences, setPreferences] = useState({
    dietary: ['Vegan', 'Gluten-Free'],
    accessibility: [] as string[],
    travelStyle: 'Nature & Adventure',
    budget: 'Moderate',
    ecoPriority: true
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
            {profile.name[0]}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-slate-800 text-white rounded-full shadow-md hover:bg-slate-700 transition">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
          <p className="text-slate-500">Member since 2023 • <span className="text-teal-600 font-bold">Eco-Scout Level 4</span></p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('PROFILE')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                activeTab === 'PROFILE' ? 'bg-white shadow-sm text-teal-700 border border-slate-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User className="w-5 h-5" /> Personal Info
            </button>
            <button 
              onClick={() => setActiveTab('PREFERENCES')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                activeTab === 'PREFERENCES' ? 'bg-white shadow-sm text-teal-700 border border-slate-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Plane className="w-5 h-5" /> Travel DNA
            </button>
            <button 
              onClick={() => setActiveTab('SETTINGS')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
                activeTab === 'SETTINGS' ? 'bg-white shadow-sm text-teal-700 border border-slate-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Lock className="w-5 h-5" /> Account Settings
            </button>
          </nav>

          <div className="mt-8 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <h4 className="flex items-center gap-2 font-bold text-emerald-800 text-sm mb-2">
              <Shield className="w-4 h-4" /> Privacy Promise
            </h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              We only use your profile data to personalize your itineraries and calculate carbon footprints. We never sell your personal history.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          
          {activeTab === 'PROFILE' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
                <span className="text-xs text-slate-400">Used for bookings & receipts</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    disabled
                    className="w-full p-2.5 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Home Airport / City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      value={profile.homeAirport}
                      onChange={(e) => setProfile({...profile, homeAirport: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                      placeholder="e.g. London Heathrow"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Crucial for calculating travel carbon footprint.</p>
                </div>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                 <textarea 
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="Tell us a bit about your travel style..."
                 />
              </div>
            </div>
          )}

          {activeTab === 'PREFERENCES' && (
             <div className="space-y-8 animate-fade-in">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Travel DNA</h2>
                    <p className="text-slate-500 text-sm mb-6">These settings help our AI tailor itineraries specifically for you.</p>
                </div>

                {/* Dietary */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Utensils className="w-5 h-5 text-slate-400" />
                        <h3 className="font-bold text-slate-700">Dietary Requirements</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Kosher', 'Nut Allergy'].map(tag => (
                            <button 
                                key={tag}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                                    preferences.dietary.includes(tag) 
                                    ? 'bg-teal-50 border-teal-500 text-teal-700' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Accessibility */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Accessibility className="w-5 h-5 text-slate-400" />
                        <h3 className="font-bold text-slate-700">Accessibility Needs</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['Wheelchair Accessible', 'Step-Free Access', 'Visual Aid', 'Auditory Aid'].map(tag => (
                            <button 
                                key={tag}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                                    preferences.accessibility.includes(tag) 
                                    ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-slate-100"></div>

                {/* Travel Style */}
                <div>
                    <h3 className="font-bold text-slate-700 mb-3">Preferred Travel Style</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Relaxed', 'Adventure', 'Cultural', 'Luxury'].map(style => (
                            <div 
                                key={style}
                                className={`p-3 rounded-lg border-2 cursor-pointer text-center transition ${
                                    preferences.travelStyle === style 
                                    ? 'border-teal-500 bg-teal-50 text-teal-800' 
                                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                }`}
                            >
                                <span className="text-sm font-bold">{style}</span>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'SETTINGS' && (
            <div className="space-y-8 animate-fade-in">
               <h2 className="text-xl font-bold text-slate-800 mb-4">Account & Privacy</h2>

               {/* Preferences */}
               <div className="space-y-4">
                   <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Global Preferences</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                           <label className="block text-sm text-slate-600 mb-1">Currency</label>
                           <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white">
                               <option>USD ($)</option>
                               <option>EUR (€)</option>
                               <option>GBP (£)</option>
                           </select>
                       </div>
                       <div>
                           <label className="block text-sm text-slate-600 mb-1">Units</label>
                           <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white">
                               <option>Metric (km, kg)</option>
                               <option>Imperial (mi, lbs)</option>
                           </select>
                       </div>
                   </div>
               </div>

               <div className="h-px bg-slate-100"></div>

               {/* Notifications */}
               <div className="space-y-4">
                   <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Notifications</h3>
                   <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                       <span className="text-slate-700 text-sm">Trip Updates & Reminders</span>
                       <input type="checkbox" defaultChecked className="w-5 h-5 text-teal-600 rounded" />
                   </label>
                   <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                       <span className="text-slate-700 text-sm">Eco-Rewards & Badges</span>
                       <input type="checkbox" defaultChecked className="w-5 h-5 text-teal-600 rounded" />
                   </label>
                   <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                       <span className="text-slate-700 text-sm">Marketing & Offers</span>
                       <input type="checkbox" className="w-5 h-5 text-teal-600 rounded" />
                   </label>
               </div>

               <div className="h-px bg-slate-100"></div>

               {/* Eco Defaults */}
               <div className="space-y-4">
                   <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider flex items-center gap-2">
                       <Leaf className="w-4 h-4 text-emerald-600" /> Eco-Defaults
                   </h3>
                   <label className="flex items-center justify-between p-3 rounded-lg border border-emerald-100 bg-emerald-50/50 cursor-pointer">
                       <div>
                           <span className="block text-slate-800 text-sm font-medium">Prioritize Low-Carbon Transport</span>
                           <span className="block text-xs text-slate-500">Always suggest trains over flights when &lt; 6 hrs.</span>
                       </div>
                       <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded" />
                   </label>
               </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
             <button className="px-6 py-2 text-slate-500 hover:text-slate-800 font-medium">Cancel</button>
             <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 flex items-center gap-2 disabled:opacity-70"
             >
                {isSaving ? 'Saving...' : <React.Fragment><Save className="w-4 h-4" /> Save Changes</React.Fragment>}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};