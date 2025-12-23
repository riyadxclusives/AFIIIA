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
    <div className="min-h-screen bg-gradient-hero pb-24">
      {/* Top header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="AFIIIA" 
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="font-serif text-xl font-semibold text-gradient">
              AFIIIA
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <NavLink 
              to="/home/profile"
              className={({ isActive }) => `
                w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              <User className="w-5 h-5" />
            </NavLink>
            <NavLink 
              to="/home/settings"
              className={({ isActive }) => `
                w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              <Settings className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center gap-1 py-2 px-4 transition-all"
                >
                  <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? "bg-gradient-primary text-primary-foreground shadow-glow-lavender scale-110" 
                      : "text-muted-foreground hover:bg-secondary"
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`
                    text-xs font-medium transition-all
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
