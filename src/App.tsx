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
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
