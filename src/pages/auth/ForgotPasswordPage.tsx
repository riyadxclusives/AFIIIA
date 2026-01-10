import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

interface LocationState {
  from?: string;
}

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  
  const state = location.state as LocationState | null;
  const cameFromApp = state?.from?.startsWith('/home');
  const backRoute = cameFromApp ? '/home' : '/login';
  const backLabel = cameFromApp ? 'Back to Home' : 'Back to Sign In';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
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
          <CardTitle className="font-serif text-3xl">Reset Password</CardTitle>
          <CardDescription>
            {isSubmitted 
              ? "Check your email for reset instructions"
              : "Enter your email to receive a password reset link"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-11"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h3 className="font-medium text-lg text-foreground mb-2">
                  Email Sent!
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  We've sent a password reset link to <strong className="text-foreground">{email}</strong>. 
                  Please check your inbox and spam folder.
                </p>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsSubmitted(false)}
                  className="w-full"
                >
                  Send Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6">
            <Link to={backRoute}>
              <Button variant="ghost" size="sm" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {backLabel}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
