
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Layout } from './components/Layout';
import { Landing } from './components/Landing';
import { SmartPlanner } from './components/SmartPlanner';
import { BookingFlow } from './components/BookingFlow';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { SmartSearch } from './components/SmartSearch';
import { DestinationDetails } from './components/DestinationDetails';
import { EcoPage } from './components/EcoPage';
import { AdminPanel } from './components/AdminPanel';
import { TouristDashboard } from './components/TouristDashboard';
import { BusinessDashboard } from './components/BusinessDashboard';
import { GovDashboard } from './components/GovDashboard';
import { UserProfile } from './components/UserProfile';
import { SmartRoom } from './components/SmartRoom';
import { AIAssistant } from './components/AIAssistant';
import { ARNavigation } from './components/ARNavigation';
import { SmartMobility } from './components/SmartMobility';
import { ExperienceDetails } from './components/ExperienceDetails';
import { LocalMarketplace } from './components/LocalMarketplace';
import { NearbyEvents } from './components/NearbyEvents';
import { TravelDiary } from './components/TravelDiary';
import { RewardsStore } from './components/RewardsStore';
import { TripCalendar } from './components/TripCalendar';
import { SmartTravelFlow } from './components/SmartTravelFlow';
import { FoodOrderFlow } from './components/FoodOrderFlow';
import { AndhraThemes } from './components/AndhraThemes';
import { ViewState, Itinerary } from './types';

// Wrapper component to handle routing logic inside AuthContext
const AppContent = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [selectedFoodItem, setSelectedFoodItem] = useState<any | null>(null);

  // Auto-redirect if trying to access protected routes while logged out
  useEffect(() => {
    const protectedViews = [
        ViewState.TOURIST, ViewState.BUSINESS, ViewState.GOV, 
        ViewState.PROFILE, ViewState.SMART_ROOM, ViewState.BOOKING,
        ViewState.TRAVEL_DIARY, ViewState.REWARDS, ViewState.ADMIN
    ];

    if (!isLoading && !isAuthenticated && protectedViews.includes(currentView)) {
        console.log("Unauthorized access attempt. Redirecting to Login.");
        setCurrentView(ViewState.LOGIN);
    }
  }, [currentView, isAuthenticated, isLoading]);

  const handleBooking = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    setCurrentView(ViewState.BOOKING);
  };

  const handleFoodSelect = (item: any) => {
    setSelectedFoodItem(item);
    setCurrentView(ViewState.FOOD_ORDER);
  };

  const renderView = () => {
    if (isLoading) return <div className="h-screen flex items-center justify-center bg-slate-50">Loading Secure Environment...</div>;

    switch (currentView) {
      case ViewState.LANDING:
        return <Landing onNavigate={setCurrentView} />;
      case ViewState.ANDHRA_THEMES:
        return <AndhraThemes onNavigate={setCurrentView} />;
      case ViewState.LOGIN:
        return <Login onLoginSuccess={setCurrentView} />;
      case ViewState.SIGNUP:
        return <Signup onNavigate={setCurrentView} />;
      case ViewState.PLANNER:
        return <SmartPlanner onBook={handleBooking} />;
      case ViewState.SEARCH:
        return <SmartSearch onNavigate={setCurrentView} />;
      case ViewState.DETAILS:
        return <DestinationDetails onNavigate={setCurrentView} />;
      case ViewState.EXPERIENCE_DETAILS:
        return <ExperienceDetails onNavigate={setCurrentView} />;
      case ViewState.BOOKING:
        return (
          <BookingFlow 
            itinerary={selectedItinerary} 
            onComplete={() => setCurrentView(ViewState.TOURIST)}
            onCancel={() => setCurrentView(ViewState.PLANNER)}
          />
        );
      case ViewState.ECO:
        return <EcoPage />;
      case ViewState.ADMIN:
        return isAuthenticated ? <AdminPanel /> : <Login onLoginSuccess={setCurrentView} />;
      case ViewState.TOURIST:
        return isAuthenticated ? <TouristDashboard onNavigate={setCurrentView} onFoodSelect={handleFoodSelect} /> : <Login onLoginSuccess={setCurrentView} />;
      case ViewState.BUSINESS:
        return isAuthenticated ? <BusinessDashboard /> : <Login onLoginSuccess={setCurrentView} />;
      case ViewState.GOV:
        return isAuthenticated ? <GovDashboard /> : <Login onLoginSuccess={setCurrentView} />;
      case ViewState.PROFILE:
        return isAuthenticated ? <UserProfile /> : <Login onLoginSuccess={setCurrentView} />;
      case ViewState.SMART_ROOM:
        return <SmartRoom onNavigate={setCurrentView} />;
      case ViewState.AR_NAV:
        return <ARNavigation onNavigate={setCurrentView} />;
      case ViewState.MOBILITY:
        return <SmartMobility onNavigate={setCurrentView} />;
      case ViewState.MARKETPLACE:
        return <LocalMarketplace onNavigate={setCurrentView} />;
      case ViewState.EVENTS:
        return <NearbyEvents onNavigate={setCurrentView} />;
      case ViewState.TRAVEL_DIARY:
        return <TravelDiary onNavigate={setCurrentView} />;
      case ViewState.REWARDS:
        return <RewardsStore onNavigate={setCurrentView} />;
      case ViewState.CALENDAR:
        return <TripCalendar onNavigate={setCurrentView} />;
      case ViewState.SMART_FLOW:
        return <SmartTravelFlow onNavigate={setCurrentView} />;
      case ViewState.FOOD_ORDER:
        return <FoodOrderFlow foodItem={selectedFoodItem} onNavigate={setCurrentView} />;
      default:
        return <Landing onNavigate={setCurrentView} />;
    }
  };
  
  return (
    <Layout activeView={currentView} onNavigate={setCurrentView}>
      {renderView()}
      <AIAssistant currentView={currentView} />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
