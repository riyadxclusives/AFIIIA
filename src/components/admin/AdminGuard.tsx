import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for admin session
    const checkAuth = () => {
      const adminSession = sessionStorage.getItem("admin_session");
      
      if (adminSession) {
        try {
          const session = JSON.parse(adminSession);
          // Check if session is valid (has email and not expired)
          if (session.email && session.timestamp) {
            // Session expires after 24 hours
            const sessionAge = Date.now() - session.timestamp;
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours
            
            if (sessionAge < maxAge) {
              setIsAuthenticated(true);
              setIsChecking(false);
              return;
            }
          }
        } catch (e) {
          // Invalid session data
          sessionStorage.removeItem("admin_session");
        }
      }
      
      // Not authenticated - redirect to login
      setIsAuthenticated(false);
      setIsChecking(false);
      navigate("/admin/login", { 
        state: { from: location.pathname },
        replace: true 
      });
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying admin access...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AdminGuard;
