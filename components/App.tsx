
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { Layout } from './Layout';
import { Landing } from './Landing';
import { SmartPlanner } from './SmartPlanner';
import { BookingFlow } from './BookingFlow';
import { Login } from './Login';
import { Signup } from './Signup';
import { SmartSearch } from './SmartSearch';
import { DestinationDetails } from './DestinationDetails';
import { EcoPage } from './EcoPage';
import { AdminPanel } from './AdminPanel';
import { TouristDashboard } from './TouristDashboard';
import { BusinessDashboard } from './BusinessDashboard';
import { GovDashboard } from './GovDashboard';
import { UserProfile } from './UserProfile';
import { SmartRoom } from './SmartRoom';
import { AIAssistant } from './AIAssistant';
import { ARNavigation } from './ARNavigation';
import { SmartMobility } from './SmartMobility';
import { ExperienceDetails } from './ExperienceDetails';
import { LocalMarketplace } from './LocalMarketplace';
import { NearbyEvents } from './NearbyEvents';
import { TravelDiary } from './TravelDiary';
import { RewardsStore } from './RewardsStore';
import { TripCalendar } from './TripCalendar';
import { SmartTravelFlow } from './SmartTravelFlow';
import { FoodOrderFlow } from './FoodOrderFlow';
import { AndhraThemes } from './AndhraThemes';
import { StayBooking } from './StayBooking';
import { ViewState, Itinerary } from '../types';

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
      case ViewState.STAYS:
        return <StayBooking onNavigate={setCurrentView} />;
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
