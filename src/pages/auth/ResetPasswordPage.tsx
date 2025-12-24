import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Password validation rules
  const passwordRules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Contains a number", valid: /[0-9]/.test(password) },
  ];

  const allRulesValid = passwordRules.every(rule => rule.valid);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = allRulesValid && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      toast.error("Please meet all password requirements");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - In real implementation, use supabase.auth.updateUser
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Password reset successfully!");
    }, 1500);
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral-soft/30 blob float" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-lavender-soft/30 blob float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-teal-soft/30 blob float" style={{ animationDelay: "4s" }} />
      </div>

      <Card className="w-full max-w-md glass-card relative z-10 animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="AFIIIA" className="h-16 w-16 rounded-2xl object-cover" />
          </div>
          <CardTitle className="font-serif text-3xl">
            {isSuccess ? "Password Updated!" : "Create New Password"}
          </CardTitle>
          <CardDescription>
            {isSuccess 
              ? "Your password has been reset successfully"
              : "Choose a strong password to protect your account"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-11 pr-12"
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

                {/* Password Requirements */}
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-muted/50 rounded-lg p-3 space-y-1.5"
                  >
                    {passwordRules.map((rule, index) => (
                      <motion.div
                        key={rule.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          rule.valid ? "bg-primary text-primary-foreground" : "bg-muted-foreground/30"
                        }`}>
                          {rule.valid && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <span className={rule.valid ? "text-foreground" : "text-muted-foreground"}>
                          {rule.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`h-12 pl-11 pr-12 ${
                        confirmPassword.length > 0 
                          ? passwordsMatch 
                            ? "border-primary focus-visible:ring-primary" 
                            : "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="text-sm text-destructive">Passwords don't match</p>
                  )}
                  {passwordsMatch && (
                    <p className="text-sm text-primary flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Passwords match
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading || !canSubmit}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      Reset Password
                    </>
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
                  <ShieldCheck className="w-10 h-10 text-primary" />
                </motion.div>
                
                <h3 className="font-medium text-lg text-foreground mb-2">
                  You're All Set!
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Your password has been updated successfully. You can now sign in with your new password.
                </p>
                
                <Button 
                  variant="hero"
                  size="lg"
                  onClick={handleGoToLogin}
                  className="w-full"
                >
                  Sign In Now
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!isSuccess && (
            <div className="mt-6">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="w-full">
                  ← Back to Sign In
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
