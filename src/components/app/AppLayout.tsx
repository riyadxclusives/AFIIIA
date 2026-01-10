import { ReactNode, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, Dumbbell, Utensils, User, Settings, Trophy, Smile } from "lucide-react";
import logo from "@/assets/logo.jpg";
import PullToRefresh from "@/components/PullToRefresh";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";

interface AppLayoutProps {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
}

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Calendar, label: "Cycle", path: "/home/cycle" },
  { icon: Dumbbell, label: "Workout", path: "/home/workout" },
  { icon: Utensils, label: "Meal", path: "/home/meal" },
  { icon: Smile, label: "Mood", path: "/home/mood" },
];

const navRoutes = navItems.map(item => item.path);

const AppLayout = ({ children, onRefresh }: AppLayoutProps) => {
  const location = useLocation();
  const haptic = useHapticFeedback();
  const [refreshKey, setRefreshKey] = useState(0);
  
  const { handlers: swipeHandlers, currentIndex } = useSwipeNavigation({
    routes: navRoutes,
    threshold: 50,
    velocityThreshold: 0.3,
  });

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      await onRefresh();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRefreshKey(prev => prev + 1);
    }
  }, [onRefresh]);

  const handleNavClick = () => {
    haptic.light();
  };
  return (
    <div className="min-h-screen bg-gradient-hero pb-[calc(5rem+env(safe-area-inset-bottom,0px))] relative overflow-hidden">
      {/* Glassmorphism background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-coral/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-32 w-80 h-80 bg-lavender/25 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-teal/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-peach/25 rounded-full blur-3xl animate-blob" />
      </div>
      {/* Top header */}
      <header className="sticky top-0 z-40 glass-header safe-top">
        <div className="mobile-container h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="AFIIIA" 
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="font-serif text-lg font-semibold text-gradient">
              AFIIIA
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <NavLink 
              to="/home/challenges"
              className={({ isActive }) => `
                touch-target rounded-full flex items-center justify-center transition-all
                ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground active:bg-secondary/50"}
              `}
            >
              <Trophy className="w-5 h-5" />
            </NavLink>
            <NavLink 
              to="/home/profile"
              className={({ isActive }) => `
                touch-target rounded-full flex items-center justify-center transition-all
                ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground active:bg-secondary/50"}
              `}
            >
              <User className="w-5 h-5" />
            </NavLink>
            <NavLink 
              to="/home/settings"
              className={({ isActive }) => `
                touch-target rounded-full flex items-center justify-center transition-all
                ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground active:bg-secondary/50"}
              `}
            >
              <Settings className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main content with pull-to-refresh and swipe navigation */}
      <div 
        {...swipeHandlers}
        className="touch-pan-y"
      >
        <PullToRefresh onRefresh={handleRefresh} className="mobile-container py-4 min-h-[calc(100vh-8rem)]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={location.pathname + refreshKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </PullToRefresh>
      </div>

      {/* Bottom navigation - mobile optimized */}
      <nav className="bottom-nav">
        <div className="mobile-container">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className="flex flex-col items-center justify-center touch-target transition-all active:scale-95"
                >
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                    ${isActive 
                      ? "bg-gradient-primary text-primary-foreground shadow-glow-lavender" 
                      : "text-muted-foreground"
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`
                    text-[10px] font-medium mt-0.5 transition-all
                    ${isActive ? "text-foreground" : "text-muted-foreground"}
                  `}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
