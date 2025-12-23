import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import SubscribePage from "./pages/home/SubscribePage";
import HomePage from "./pages/home/HomePage";
import CyclePage from "./pages/home/CyclePage";
import WorkoutPage from "./pages/home/WorkoutPage";
import MealPage from "./pages/home/MealPage";
import MoodPage from "./pages/home/MoodPage";
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
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Marketing */}
          <Route path="/" element={<Index />} />
          
          {/* Legal Pages */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Onboarding */}
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          {/* User App */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/subscribe" element={<SubscribePage />} />
          <Route path="/home/cycle" element={<CyclePage />} />
          <Route path="/home/workout" element={<WorkoutPage />} />
          <Route path="/home/meal" element={<MealPage />} />
          <Route path="/home/mood" element={<MoodPage />} />
          <Route path="/home/profile" element={<ProfilePage />} />
          <Route path="/home/settings" element={<SettingsPage />} />
          <Route path="/home/challenges" element={<BuddyChallengesPage />} />
          <Route path="/home/challenges/:id" element={<ChallengeDetailPage />} />
          
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/features" element={<AdminFeaturesPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route path="/admin/database" element={<AdminDatabasePage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/billing" element={<AdminBillingPage />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
