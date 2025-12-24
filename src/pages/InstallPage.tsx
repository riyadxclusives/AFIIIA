import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Share, Smartphone, Check, ArrowRight, Apple, MoreVertical, Plus, ExternalLink, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [activeTab, setActiveTab] = useState("ios");

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
    
    // Set default tab based on device
    if (isAndroidDevice) {
      setActiveTab("android");
    }

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
    { icon: "📱", text: "Works offline - access your data anytime" },
    { icon: "⚡", text: "Fast loading - no browser slowdown" },
    { icon: "🔔", text: "Push notifications for reminders" },
    { icon: "✨", text: "Full-screen native app experience" },
    { icon: "🏠", text: "Easy access from your home screen" },
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

      <main className="container mx-auto px-4 py-6 max-w-lg">
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
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-primary p-0.5 shadow-elevated"
            >
              <img 
                src={logo} 
                alt="AFIIIA" 
                className="w-full h-full rounded-2xl object-cover"
              />
            </motion.div>
            
            <h1 className="font-serif text-2xl font-bold text-gradient">
              Install AFIIIA
            </h1>
            <p className="text-muted-foreground text-sm">
              Add to your home screen for the best experience
            </p>
          </div>

          {/* Already installed */}
          {isInstalled && (
            <Card className="bg-teal-soft/50 border-teal/30">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Already Installed!</p>
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
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Download className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Quick Install Available!</h3>
                    <p className="text-sm text-muted-foreground">Tap the button below</p>
                  </div>
                </div>
                <Button 
                  onClick={handleInstall}
                  className="w-full bg-gradient-primary hover:opacity-90 h-12 text-lg font-semibold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Install AFIIIA Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step-by-step Instructions with Tabs */}
          {!isInstalled && !deferredPrompt && (
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-2 rounded-none h-14 bg-secondary/50">
                    <TabsTrigger 
                      value="ios" 
                      className="h-full rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2"
                    >
                      <Apple className="w-5 h-5" />
                      iPhone / iPad
                    </TabsTrigger>
                    <TabsTrigger 
                      value="android"
                      className="h-full rounded-none data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2"
                    >
                      <Smartphone className="w-5 h-5" />
                      Android
                    </TabsTrigger>
                  </TabsList>

                  {/* iOS Instructions */}
                  <TabsContent value="ios" className="p-5 space-y-5 mt-0">
                    <div className="text-center pb-2">
                      <h3 className="font-semibold text-foreground">How to Install on iPhone/iPad</h3>
                      <p className="text-sm text-muted-foreground">Follow these 3 easy steps in Safari</p>
                    </div>

                    {/* Step 1 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                          1
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Tap the Share Button</h4>
                        <div className="bg-secondary/70 rounded-xl p-4 space-y-3">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                              <Share className="w-5 h-5 text-primary" />
                            </div>
                            <span>Look for this icon at the bottom of Safari</span>
                          </div>
                          <p className="text-xs text-muted-foreground/80">
                            If using Chrome, tap the 3 dots menu ••• instead
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                          2
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Find "Add to Home Screen"</h4>
                        <div className="bg-secondary/70 rounded-xl p-4 space-y-3">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                              <Plus className="w-5 h-5 text-foreground" />
                            </div>
                            <span>Scroll down and tap <strong className="text-foreground">"Add to Home Screen"</strong></span>
                          </div>
                          <p className="text-xs text-muted-foreground/80">
                            You may need to scroll down in the share menu to see it
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                          3
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Tap "Add" to Confirm</h4>
                        <div className="bg-secondary/70 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={logo} alt="AFIIIA" className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-sm font-medium text-foreground">AFIIIA</span>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                              Add
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Success */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center pt-2"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-soft/50 text-teal text-sm font-medium">
                        <Check className="w-4 h-4" />
                        Done! Find AFIIIA on your home screen
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* Android Instructions */}
                  <TabsContent value="android" className="p-5 space-y-5 mt-0">
                    <div className="text-center pb-2">
                      <h3 className="font-semibold text-foreground">How to Install on Android</h3>
                      <p className="text-sm text-muted-foreground">Follow these 3 easy steps in Chrome</p>
                    </div>

                    {/* Step 1 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                          1
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Tap the Menu Button</h4>
                        <div className="bg-secondary/70 rounded-xl p-4 space-y-3">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                              <MoreVertical className="w-5 h-5 text-foreground" />
                            </div>
                            <span>Look for the 3 dots in the <strong className="text-foreground">top right</strong> of Chrome</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                          2
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Find the Install Option</h4>
                        <div className="bg-secondary/70 rounded-xl p-4 space-y-3">
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                              <Download className="w-5 h-5 text-primary" />
                            </div>
                            <span>Tap <strong className="text-foreground">"Install app"</strong> or <strong className="text-foreground">"Add to Home screen"</strong></span>
                          </div>
                          <p className="text-xs text-muted-foreground/80">
                            The option name may vary slightly on different phones
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                          3
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Tap "Install" to Confirm</h4>
                        <div className="bg-secondary/70 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img src={logo} alt="AFIIIA" className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-sm font-medium text-foreground">AFIIIA</span>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                              Install
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Success */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center pt-2"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-soft/50 text-teal text-sm font-medium">
                        <Check className="w-4 h-4" />
                        Done! Find AFIIIA on your home screen
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Why Install Features */}
          <Card className="glass-card">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-4">Why install the app?</h3>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <motion.li
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="text-lg">{feature.icon}</span>
                    {feature.text}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Continue to app */}
          <div className="pt-2 pb-4">
            <Link to="/home">
              <Button variant="hero" className="w-full h-12">
                Continue to App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default InstallPage;