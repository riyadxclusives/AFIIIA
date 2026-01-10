import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

interface LocationState {
  from?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const state = location.state as LocationState | null;
  const backRoute = state?.from || '/';
  const backLabel = state?.from?.startsWith('/home') ? '← Back to Home' : '← Back to landing page';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { success, error } = await login(email, password);
    
    if (success) {
      toast.success("Welcome back!");
      // Redirect to original destination or home
      const redirectTo = state?.from || "/home";
      navigate(redirectTo);
    } else {
      toast.error(error || "Login failed");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glassmorphism background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -right-32 w-96 h-96 bg-coral/40 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-lavender/35 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-peach/30 rounded-full blur-3xl animate-blob animation-delay-6000" />
      </div>

      <Card variant="glass-strong" className="w-full max-w-md relative z-10 animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="AFIIIA" className="h-16 w-16 rounded-2xl object-cover" />
          </div>
          <CardTitle className="font-serif text-3xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to continue your wellness journey
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <Link to={backRoute}>
              <Button variant="ghost" size="sm" className="w-full">
                {backLabel}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
