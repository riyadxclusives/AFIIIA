import { ReactNode, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ToggleLeft,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Database,
  FileText,
  CreditCard,
  BarChart3,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: ToggleLeft, label: "Feature Flags", path: "/admin/features" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" },
  { icon: Database, label: "Database", path: "/admin/database" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: CreditCard, label: "Billing", path: "/admin/billing" },
  { icon: FileText, label: "Content", path: "/admin/content" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("admin_demo_session");
    navigate("/admin/login");
  };

  const NavItem = ({ item, isCollapsed }: { item: typeof navItems[0]; isCollapsed: boolean }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    const content = (
      <NavLink
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
          ${isActive 
            ? "bg-primary text-primary-foreground shadow-md" 
            : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }
          ${isCollapsed ? "justify-center" : ""}
        `}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {!isCollapsed && (
          <span className="text-sm font-medium truncate">{item.label}</span>
        )}
      </NavLink>
    );

    if (isCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-slate-800 text-white border-slate-700">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="font-serif font-bold text-white text-lg">AFIIIA</h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        )}
      </div>

      <Separator className="bg-slate-700/50 mx-4" />

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      <Separator className="bg-slate-700/50 mx-4" />

      {/* User & Logout */}
      <div className="p-3 space-y-2">
        <div className={`flex items-center gap-3 p-2 rounded-lg bg-slate-700/30 ${isCollapsed ? "justify-center" : ""}`}>
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary text-sm">
              A
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs text-slate-500 truncate">admin@afiiia.com</p>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full text-slate-400 hover:text-red-400 hover:bg-red-900/20 ${isCollapsed ? "px-0" : ""}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col border-r border-slate-700/50 bg-slate-800/50 backdrop-blur-xl shrink-0"
      >
        <SidebarContent isCollapsed={collapsed} />
        
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-20 -right-3 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
          style={{ left: collapsed ? 60 : 244 }}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-slate-800 border-r border-slate-700/50 z-50"
            >
              <SidebarContent isCollapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-xl flex items-center px-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            className="text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-white">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
