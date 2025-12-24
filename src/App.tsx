import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OfflinePage from "./pages/OfflinePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import SubscribePage from "./pages/home/SubscribePage";
import HomePage from "./pages/home/HomePage";
import CyclePage from "./pages/home/CyclePage";
import PeriodCalendarPage from "./pages/home/PeriodCalendarPage";
import WorkoutPage from "./pages/home/WorkoutPage";
import MealPage from "./pages/home/MealPage";
import MoodPage from "./pages/home/MoodPage";
import MoodHistoryPage from "./pages/home/MoodHistoryPage";
import ProfilePage from "./pages/home/ProfilePage";
import SettingsPage from "./pages/home/SettingsPage";
import BuddyChallengesPage from "./pages/home/BuddyChallengesPage";
import ChallengeDetailPage from "./pages/home/ChallengeDetailPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminFeaturesPage from "./pages/admin/AdminFeaturesPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import AdminDatabasePage from "./pages/admin/AdminDatabasePage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminBillingPage from "./pages/admin/AdminBillingPage";
import AdminContentPage from "./pages/admin/AdminContentPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import RefundPage from "./pages/legal/RefundPage";
import CookiesPage from "./pages/legal/CookiesPage";
import ContactPage from "./pages/legal/ContactPage";
import HelpCenterPage from "./pages/legal/HelpCenterPage";
import InstallPage from "./pages/InstallPage";
import CookieConsent from "./components/CookieConsent";
import SplashScreen from "./components/SplashScreen";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/landing/ScrollToTop";
import ScrollRestoration from "./components/ScrollRestoration";
import OfflineStatusBanner from "./components/OfflineStatusBanner";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Marketing */}
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        
        {/* Legal & Support Pages */}
        <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
        <Route path="/refund" element={<PageTransition><RefundPage /></PageTransition>} />
        <Route path="/cookies" element={<PageTransition><CookiesPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/help" element={<PageTransition><HelpCenterPage /></PageTransition>} />
        
        {/* Auth */}
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
        
        {/* Onboarding */}
        <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />
        <Route path="/install" element={<PageTransition><InstallPage /></PageTransition>} />
        <Route path="/offline" element={<PageTransition><OfflinePage /></PageTransition>} />
        
        {/* User App */}
        <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/home/subscribe" element={<PageTransition><SubscribePage /></PageTransition>} />
        <Route path="/home/cycle" element={<PageTransition><CyclePage /></PageTransition>} />
        <Route path="/home/period-calendar" element={<PageTransition><PeriodCalendarPage /></PageTransition>} />
        <Route path="/home/workout" element={<PageTransition><WorkoutPage /></PageTransition>} />
        <Route path="/home/meal" element={<PageTransition><MealPage /></PageTransition>} />
        <Route path="/home/mood" element={<PageTransition><MoodPage /></PageTransition>} />
        <Route path="/home/mood/history" element={<PageTransition><MoodHistoryPage /></PageTransition>} />
        <Route path="/home/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        <Route path="/home/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
        <Route path="/home/challenges" element={<PageTransition><BuddyChallengesPage /></PageTransition>} />
        <Route path="/home/challenges/:id" element={<PageTransition><ChallengeDetailPage /></PageTransition>} />
        
        {/* Admin */}
        <Route path="/admin/login" element={<PageTransition><AdminLoginPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="/admin/users" element={<PageTransition><AdminUsersPage /></PageTransition>} />
        <Route path="/admin/features" element={<PageTransition><AdminFeaturesPage /></PageTransition>} />
        <Route path="/admin/notifications" element={<PageTransition><AdminNotificationsPage /></PageTransition>} />
        <Route path="/admin/database" element={<PageTransition><AdminDatabasePage /></PageTransition>} />
        <Route path="/admin/analytics" element={<PageTransition><AdminAnalyticsPage /></PageTransition>} />
        <Route path="/admin/billing" element={<PageTransition><AdminBillingPage /></PageTransition>} />
        <Route path="/admin/content" element={<PageTransition><AdminContentPage /></PageTransition>} />
        <Route path="/admin/settings" element={<PageTransition><AdminSettingsPage /></PageTransition>} />
        
        {/* Catch-all */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OfflineStatusBanner />
        <ScrollRestoration />
        <AnimatedRoutes />
        <CookieConsent />
        <SplashScreen />
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
