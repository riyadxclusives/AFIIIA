import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Share, Smartphone, Check, ArrowRight, Apple, Chrome, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check device type
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isAndroidDevice = /android/.test(userAgent);
    
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    
    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const features = [
    "Works offline - access your data anytime",
    "Faster loading - no browser slowdown", 
    "Push notifications for reminders",
    "Full-screen app experience",
    "Easy access from home screen",
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AFIIIA" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-serif text-lg font-semibold text-gradient">AFIIIA</span>
          </Link>
          <Link to="/home">
            <Button variant="ghost" size="sm">
              Skip <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Hero */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-24 h-24 mx-auto rounded-3xl bg-gradient-primary p-0.5"
            >
              <img 
                src={logo} 
                alt="AFIIIA" 
                className="w-full h-full rounded-3xl object-cover"
              />
            </motion.div>
            
            <h1 className="font-serif text-2xl font-bold text-gradient">
              Install AFIIIA
            </h1>
            <p className="text-muted-foreground">
              Get the full app experience on your phone!
            </p>
          </div>

          {/* Already installed */}
          {isInstalled && (
            <Card className="bg-accent/50 border-accent">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Already Installed!</p>
                  <p className="text-sm text-muted-foreground">Open AFIIIA from your home screen</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Install button for Android/Desktop with prompt available */}
          {!isInstalled && deferredPrompt && (
            <Card className="glass-card border-primary/30">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Chrome className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">One-Tap Install</h3>
                    <p className="text-sm text-muted-foreground">Quick and easy!</p>
                  </div>
                </div>
                <Button 
                  onClick={handleInstall}
                  className="w-full bg-gradient-primary hover:opacity-90 h-12 text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* iOS instructions */}
          {!isInstalled && isIOS && (
            <Card className="glass-card border-primary/30">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Apple className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">iPhone / iPad</h3>
                    <p className="text-sm text-muted-foreground">Just 3 easy steps!</p>
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-xl p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">1</span>
                    <div>
                      <p className="font-medium text-foreground">Tap the Share button</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Look for <Share className="w-4 h-4 inline mx-1" /> at the bottom of Safari
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">2</span>
                    <div>
                      <p className="font-medium text-foreground">Scroll down in the menu</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Find and tap <strong>"Add to Home Screen"</strong>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">3</span>
                    <div>
                      <p className="font-medium text-foreground">Tap "Add"</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        AFIIIA will appear on your home screen!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Android instructions (when no prompt available) */}
          {!isInstalled && isAndroid && !deferredPrompt && (
            <Card className="glass-card border-primary/30">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Android Phone</h3>
                    <p className="text-sm text-muted-foreground">Just 3 easy steps!</p>
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-xl p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">1</span>
                    <div>
                      <p className="font-medium text-foreground">Tap the menu button</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Look for <MoreVertical className="w-4 h-4 inline mx-1" /> in Chrome (top right)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">2</span>
                    <div>
                      <p className="font-medium text-foreground">Find the install option</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">3</span>
                    <div>
                      <p className="font-medium text-foreground">Tap "Install" or "Add"</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        AFIIIA will appear on your home screen!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Desktop instructions */}
          {!isInstalled && !isIOS && !isAndroid && !deferredPrompt && (
            <Card className="glass-card border-primary/30">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Chrome className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Desktop Browser</h3>
                    <p className="text-sm text-muted-foreground">Install from Chrome</p>
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-xl p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">1</span>
                    <div>
                      <p className="font-medium text-foreground">Look for install icon</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Check the address bar for <Download className="w-4 h-4 inline mx-1" /> icon
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold">2</span>
                    <div>
                      <p className="font-medium text-foreground">Click "Install"</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        A popup will ask to confirm installation
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <Card className="glass-card">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-4">Why install the app?</h3>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Continue to app */}
          <div className="text-center pt-4">
            <Link to="/home">
              <Button variant="outline" className="w-full">
                Continue to App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default InstallPage;