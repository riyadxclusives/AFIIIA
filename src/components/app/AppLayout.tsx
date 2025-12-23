import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Dumbbell, Utensils, Heart, User, Settings, Trophy } from "lucide-react";
import logo from "@/assets/logo.jpg";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Calendar, label: "Cycle", path: "/home/cycle" },
  { icon: Dumbbell, label: "Workout", path: "/home/workout" },
  { icon: Utensils, label: "Meal", path: "/home/meal" },
  { icon: Trophy, label: "Challenges", path: "/home/challenges" },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-hero pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">
      {/* Top header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 safe-top">
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

      {/* Main content */}
      <main className="mobile-container py-4 native-scroll">
        {children}
      </main>

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
