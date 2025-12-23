import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import InstallPage from "./pages/InstallPage";
import CookieConsent from "./components/CookieConsent";
import SplashScreen from "./components/SplashScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } />
            <Route path="/install" element={<InstallPage />} />
            
            {/* User App - Protected */}
            <Route path="/home" element={
              <ProtectedRoute requireOnboarding>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/home/subscribe" element={
              <ProtectedRoute>
                <SubscribePage />
              </ProtectedRoute>
            } />
            <Route path="/home/cycle" element={
              <ProtectedRoute requireOnboarding>
                <CyclePage />
              </ProtectedRoute>
            } />
            <Route path="/home/workout" element={
              <ProtectedRoute requireOnboarding>
                <WorkoutPage />
              </ProtectedRoute>
            } />
            <Route path="/home/meal" element={
              <ProtectedRoute requireOnboarding>
                <MealPage />
              </ProtectedRoute>
            } />
            <Route path="/home/mood" element={
              <ProtectedRoute requireOnboarding>
                <MoodPage />
              </ProtectedRoute>
            } />
            <Route path="/home/mood/history" element={
              <ProtectedRoute requireOnboarding>
                <MoodHistoryPage />
              </ProtectedRoute>
            } />
            <Route path="/home/profile" element={
              <ProtectedRoute requireOnboarding>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/home/settings" element={
              <ProtectedRoute requireOnboarding>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/home/challenges" element={
              <ProtectedRoute requireOnboarding>
                <BuddyChallengesPage />
              </ProtectedRoute>
            } />
            <Route path="/home/challenges/:id" element={
              <ProtectedRoute requireOnboarding>
                <ChallengeDetailPage />
              </ProtectedRoute>
            } />
            
            {/* Admin - Protected with admin role */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requireAdmin>
                <AdminUsersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/features" element={
              <ProtectedRoute requireAdmin>
                <AdminFeaturesPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/notifications" element={
              <ProtectedRoute requireAdmin>
                <AdminNotificationsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/database" element={
              <ProtectedRoute requireAdmin>
                <AdminDatabasePage />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute requireAdmin>
                <AdminAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/billing" element={
              <ProtectedRoute requireAdmin>
                <AdminBillingPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <ProtectedRoute requireAdmin>
                <AdminContentPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requireAdmin>
                <AdminSettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <SplashScreen />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
