import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Share, Smartphone, Check, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

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
    "Fast loading - no browser overhead", 
    "Push notifications for reminders",
    "Full-screen native experience",
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
              Add to your home screen for the best experience
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

          {/* Install button for Android/Desktop */}
          {!isInstalled && deferredPrompt && (
            <Button 
              onClick={handleInstall}
              className="w-full bg-gradient-primary hover:opacity-90 h-12 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Install App
            </Button>
          )}

          {/* iOS instructions */}
          {!isInstalled && isIOS && (
            <Card className="glass-card">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Install on iPhone/iPad
                </h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-medium">1</span>
                    <span className="text-muted-foreground">
                      Tap the <Share className="w-4 h-4 inline mx-1" /> <strong>Share</strong> button in Safari
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-medium">2</span>
                    <span className="text-muted-foreground">
                      Scroll down and tap <strong>"Add to Home Screen"</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-medium">3</span>
                    <span className="text-muted-foreground">
                      Tap <strong>"Add"</strong> to install
                    </span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <Card className="glass-card">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-4">Why install?</h3>
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
