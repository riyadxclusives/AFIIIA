import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, 
  Book, 
  Calendar, 
  Utensils, 
  Dumbbell, 
  Heart, 
  Users, 
  Settings, 
  CreditCard,
  Shield,
  Smartphone,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  HelpCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";

const categories = [
  {
    id: "getting-started",
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of AFIIIA",
    color: "coral",
    articles: [
      { title: "How to create your account", content: "Creating an account is easy! Simply tap 'Get Started' on the home screen, enter your email address, and create a secure password. You'll receive a confirmation email to verify your account." },
      { title: "Setting up your profile", content: "After signing up, you'll be guided through our onboarding process. This includes entering your cycle information, setting your wellness goals, and customizing your preferences." },
      { title: "Understanding your dashboard", content: "Your dashboard shows your current cycle phase, upcoming predictions, daily insights, and quick access to all features. Swipe down to refresh your data." },
      { title: "Navigating the app", content: "Use the bottom navigation bar to switch between Home, Cycle, Meals, Workouts, and Profile. Tap on any card to dive deeper into that feature." },
    ],
  },
  {
    id: "cycle-tracking",
    icon: Calendar,
    title: "Cycle Tracking",
    description: "Period predictions & fertility",
    color: "lavender",
    articles: [
      { title: "How to log your period", content: "Tap on the Cycle tab, then select 'Log Period'. Choose the start date and any symptoms you're experiencing. The app will learn your patterns over time." },
      { title: "Understanding cycle phases", content: "Your cycle has four phases: Menstrual (days 1-5), Follicular (days 6-14), Ovulation (days 14-16), and Luteal (days 17-28). Each phase affects your energy, mood, and body differently." },
      { title: "Fertility window predictions", content: "AFIIIA calculates your fertile window based on your cycle history. The most fertile days are shown in green on your calendar. Remember, predictions improve with more data." },
      { title: "Irregular cycle support", content: "If you have irregular periods, don't worry! Log your periods as they come, and our AI will adapt to your unique patterns over time." },
    ],
  },
  {
    id: "meal-planning",
    icon: Utensils,
    title: "Meal Planning",
    description: "Nutrition tailored to your cycle",
    color: "teal",
    articles: [
      { title: "How meal suggestions work", content: "Our AI suggests meals based on your current cycle phase. During menstruation, we focus on iron-rich foods. During ovulation, anti-inflammatory options. Each recipe is designed to support your body." },
      { title: "Saving favorite recipes", content: "Tap the heart icon on any recipe to save it to your favorites. Access your saved recipes from the Profile > Saved Recipes section." },
      { title: "Dietary preferences", content: "Set your dietary preferences in Settings > Diet. Choose from vegetarian, vegan, gluten-free, dairy-free, and more. All meal suggestions will respect your choices." },
      { title: "Ingredient-based recipes", content: "Use the 'What's in my fridge?' feature to enter ingredients you have, and get recipe suggestions using those items." },
    ],
  },
  {
    id: "workouts",
    icon: Dumbbell,
    title: "Workouts",
    description: "Phase-optimized exercise plans",
    color: "coral",
    articles: [
      { title: "Cycle-synced workouts explained", content: "Your energy levels fluctuate throughout your cycle. During the follicular phase, try HIIT and strength training. During the luteal phase, opt for yoga and gentle movement." },
      { title: "Tracking workout completion", content: "After finishing a workout, tap 'Complete' to log it. This helps us understand your activity patterns and make better recommendations." },
      { title: "Customizing workout intensity", content: "Adjust your preferred intensity level in Settings > Workouts. Choose from Light, Moderate, or Intense based on your fitness level." },
      { title: "Rest day recommendations", content: "AFIIIA will suggest rest days based on your activity history and cycle phase. Listen to your body and don't push through fatigue." },
    ],
  },
  {
    id: "mood-tracking",
    icon: Heart,
    title: "Mood & Wellness",
    description: "Emotional insights & patterns",
    color: "lavender",
    articles: [
      { title: "Logging your mood", content: "Tap the Mood card on your dashboard to log how you're feeling. Choose from emojis representing different moods and add any symptoms you're experiencing." },
      { title: "Understanding mood patterns", content: "View your Mood History to see patterns over time. Many users notice mood changes correlate with their cycle phases." },
      { title: "AI reflections", content: "Our AI provides gentle reflections based on your mood logs. These are meant to support, not diagnose. Always consult a healthcare provider for medical advice." },
      { title: "Exporting health reports", content: "Generate a PDF report of your mood, symptoms, and cycle data from Profile > Export Report. Great for sharing with your doctor." },
    ],
  },
  {
    id: "buddy-challenges",
    icon: Users,
    title: "Buddy Challenges",
    description: "Stay motivated with friends",
    color: "teal",
    articles: [
      { title: "Creating a challenge", content: "Go to Challenges > Create New. Choose a challenge type (hydration, workouts, mood logging), set the duration, and invite friends via link or email." },
      { title: "Joining a challenge", content: "Accept challenge invitations from your notifications or enter a challenge code. You'll see your progress alongside your buddies." },
      { title: "Leaderboards & achievements", content: "Climb the leaderboard by completing daily goals. Earn badges for streaks, personal bests, and helping others stay motivated." },
      { title: "Privacy in challenges", content: "Only your challenge progress is visible to other participants. Your health data remains private." },
    ],
  },
  {
    id: "account-settings",
    icon: Settings,
    title: "Account & Settings",
    description: "Manage your preferences",
    color: "coral",
    articles: [
      { title: "Changing your password", content: "Go to Settings > Account > Change Password. Enter your current password and create a new one. Use at least 8 characters with a mix of letters and numbers." },
      { title: "Notification preferences", content: "Customize your notifications in Settings > Notifications. Choose which reminders you want (period predictions, mood check-ins, hydration) and when to receive them." },
      { title: "Deleting your account", content: "If you wish to delete your account, go to Settings > Account > Delete Account. This action is permanent and will remove all your data." },
      { title: "Data export", content: "Download all your data from Settings > Privacy > Export Data. You'll receive a file with your complete history." },
    ],
  },
  {
    id: "subscription",
    icon: CreditCard,
    title: "Subscription & Billing",
    description: "Plans, payments & refunds",
    color: "lavender",
    articles: [
      { title: "Available plans", content: "We offer Bloom ($10.99/month) for essential features and Radiance ($19.99/month) for full access including AI insights and buddy challenges." },
      { title: "Free trial details", content: "All new users get a 14-day free trial with full access. Add your payment method to start, and cancel anytime before the trial ends. You'll be notified before any charges." },
      { title: "Changing your plan", content: "Upgrade or downgrade anytime from Settings > Subscription. Changes take effect at the start of your next billing cycle." },
      { title: "Refund policy", content: "We do not offer refunds for active subscription plans. Refunds are only considered in cases of major technical issues that prevent you from using the service. You can cancel anytime to prevent future charges." },
    ],
  },
  {
    id: "privacy-security",
    icon: Shield,
    title: "Privacy & Security",
    description: "Your data protection",
    color: "teal",
    articles: [
      { title: "How we protect your data", content: "All data is encrypted end-to-end using industry-standard protocols. We never sell your personal information to third parties." },
      { title: "What data we collect", content: "We collect cycle data, mood logs, and app usage to provide personalized recommendations. See our Privacy Policy for the complete list." },
      { title: "Data sharing controls", content: "You control what's shared. Buddy challenges only share progress, never health data. Export or delete your data anytime." },
      { title: "Two-factor authentication", content: "Enable 2FA in Settings > Security for an extra layer of protection on your account." },
    ],
  },
  {
    id: "troubleshooting",
    icon: Smartphone,
    title: "Troubleshooting",
    description: "Common issues & fixes",
    color: "coral",
    articles: [
      { title: "App not syncing", content: "Pull down on any screen to force a refresh. Check your internet connection. If issues persist, try logging out and back in." },
      { title: "Notifications not working", content: "Ensure notifications are enabled in your device settings and within the app. Check that Do Not Disturb is off." },
      { title: "Predictions seem off", content: "Predictions improve with more data. Log at least 3 cycles for accurate predictions. If your cycle is irregular, it may take longer." },
      { title: "App running slowly", content: "Close other apps running in the background. Ensure you have the latest app version. Restart your device if needed." },
    ],
  },
];

const popularArticles = [
  { category: "cycle-tracking", title: "How to log your period" },
  { category: "getting-started", title: "Setting up your profile" },
  { category: "meal-planning", title: "How meal suggestions work" },
  { category: "subscription", title: "Free trial details" },
  { category: "mood-tracking", title: "Exporting health reports" },
];

const colorClasses = {
  coral: {
    bg: "bg-coral-soft/30",
    icon: "text-coral",
    border: "border-coral/20",
  },
  lavender: {
    bg: "bg-lavender-soft/30",
    icon: "text-lavender",
    border: "border-lavender/20",
  },
  teal: {
    bg: "bg-teal-soft/30",
    icon: "text-teal",
    border: "border-teal/20",
  },
};

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.articles.some(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
      )
    );
  });

  const getFilteredArticles = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return [];
    if (!searchQuery) return category.articles;
    const query = searchQuery.toLowerCase();
    return category.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
    );
  };

  const selectedCategoryData = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;

  const { isAuthenticated } = useAuth();
  const homeRoute = isAuthenticated ? "/home" : "/";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to={homeRoute}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 backdrop-blur-sm border border-border/50 mb-4">
              <HelpCircle className="w-4 h-4 text-coral" />
              <span className="text-xs sm:text-sm font-medium text-secondary-foreground">
                Help Center
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              How can we help you?
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Search our guides or browse by category
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base rounded-xl border-border/50 bg-card/80 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {selectedCategory ? (
          /* Category Detail View */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to categories
            </Button>

            {selectedCategoryData && (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-xl ${colorClasses[selectedCategoryData.color as keyof typeof colorClasses].bg} flex items-center justify-center`}>
                    <selectedCategoryData.icon className={`w-7 h-7 ${colorClasses[selectedCategoryData.color as keyof typeof colorClasses].icon}`} />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold">
                      {selectedCategoryData.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {selectedCategoryData.description}
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {getFilteredArticles(selectedCategory).map((article, index) => (
                    <AccordionItem
                      key={index}
                      value={`article-${index}`}
                      className="border border-border/50 rounded-xl px-4 sm:px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/30"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline py-4">
                        {article.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                        {article.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            )}
          </motion.div>
        ) : (
          /* Category Grid View */
          <>
            {/* Popular Articles */}
            {!searchQuery && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 sm:mb-12"
              >
                <h2 className="font-serif text-lg sm:text-xl font-semibold mb-4">
                  Popular Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {popularArticles.map((article, index) => {
                    const category = categories.find((c) => c.id === article.category);
                    if (!category) return null;
                    const colors = colorClasses[category.color as keyof typeof colorClasses];
                    
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedCategory(article.category)}
                        className={`flex items-center gap-3 p-4 rounded-xl border ${colors.border} ${colors.bg} text-left hover:shadow-soft transition-all hover:-translate-y-0.5`}
                      >
                        <category.icon className={`w-5 h-5 ${colors.icon} shrink-0`} />
                        <span className="text-sm font-medium text-foreground line-clamp-1">
                          {article.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* Categories Grid */}
            <section>
              <h2 className="font-serif text-lg sm:text-xl font-semibold mb-4">
                {searchQuery ? "Search Results" : "Browse by Category"}
              </h2>
              
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No results found for "{searchQuery}"
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setSearchQuery("")}
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredCategories.map((category, index) => {
                    const colors = colorClasses[category.color as keyof typeof colorClasses];
                    const Icon = category.icon;
                    const articleCount = searchQuery
                      ? getFilteredArticles(category.id).length
                      : category.articles.length;

                    return (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          interactive
                          onClick={() => setSelectedCategory(category.id)}
                          className={`border ${colors.border} ${colors.bg} h-full`}
                        >
                          <CardContent className="p-5 sm:p-6">
                            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                              <Icon className={`w-6 h-6 ${colors.icon}`} />
                            </div>
                            <h3 className="font-serif text-lg font-semibold mb-1">
                              {category.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-3">
                              {category.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {articleCount} article{articleCount !== 1 ? "s" : ""}
                              </span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {/* Contact Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="glass-card p-6 sm:p-8 max-w-xl mx-auto">
            <MessageCircle className="w-10 h-10 text-coral mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">
              Still need help?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Our support team is here to assist you
            </p>
            <Link to="/contact">
              <Button variant="hero">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default HelpCenterPage;
