import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const CookiesPage = () => {
  const { getHomeRoute, getBackLabel } = useAuthNavigation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center">
          <Link 
            to={getHomeRoute()} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">{getBackLabel()}</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate dark:prose-invert max-w-none"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gradient mb-1 sm:mb-2">Cookie Policy</h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">Last updated: January 15, 2024</p>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Cookies are small text files that are stored on your device when you visit a website 
              or use an application. They help us provide you with a better experience by remembering 
              your preferences and enabling certain features.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              AFIIIA uses cookies and similar technologies for the following purposes:
            </p>

            <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2 sm:mb-3">Essential Cookies</h3>
            <div className="bg-secondary/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-muted-foreground text-sm sm:text-base">
                These cookies are necessary for the app to function properly. They enable core 
                functionality such as security, authentication, and accessibility.
              </p>
              <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base mt-2 space-y-1">
                <li>Authentication and session management</li>
                <li>Security features and fraud prevention</li>
                <li>Load balancing and performance</li>
              </ul>
            </div>

            <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2 sm:mb-3">Functional Cookies</h3>
            <div className="bg-secondary/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-muted-foreground text-sm sm:text-base">
                These cookies allow us to remember your preferences and provide enhanced features.
              </p>
              <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base mt-2 space-y-1">
                <li>Language and region preferences</li>
                <li>Display settings and themes</li>
                <li>Previously entered information</li>
              </ul>
            </div>

            <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2 sm:mb-3">Analytics Cookies</h3>
            <div className="bg-secondary/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-muted-foreground text-sm sm:text-base">
                These cookies help us understand how users interact with our app so we can improve it.
              </p>
              <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base mt-2 space-y-1">
                <li>Page views and navigation patterns</li>
                <li>Feature usage statistics</li>
                <li>Error tracking and debugging</li>
              </ul>
            </div>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              We may use third-party services that set their own cookies:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Service</th>
                    <th className="text-left py-2 text-foreground">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">Supabase</td>
                    <td className="py-2 text-muted-foreground">Authentication and data storage</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">Paddle</td>
                    <td className="py-2 text-muted-foreground">Payment processing</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">Analytics Provider</td>
                    <td className="py-2 text-muted-foreground">Usage analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Local Storage</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              In addition to cookies, we use local storage to store data on your device. This includes:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base mt-2 space-y-1.5 sm:space-y-2">
              <li>Offline data for PWA functionality</li>
              <li>Cached content for faster loading</li>
              <li>User preferences and settings</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              You can control and manage cookies in several ways:
            </p>

            <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2 sm:mb-3">Browser Settings</h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              Most browsers allow you to manage cookie preferences. You can:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li>View and delete existing cookies</li>
              <li>Block all or certain cookies</li>
              <li>Set preferences for specific websites</li>
            </ul>

            <div className="bg-coral/10 border border-coral/30 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
              <p className="text-foreground font-medium mb-2 text-sm sm:text-base">Important:</p>
              <p className="text-muted-foreground text-sm sm:text-base">
                Blocking essential cookies may prevent AFIIIA from functioning properly. 
                You may not be able to log in or access certain features.
              </p>
            </div>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Cookie Retention</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Different cookies are retained for different periods:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base mt-2 space-y-1.5 sm:space-y-2">
              <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Remain for a set period (usually 1-12 months)</li>
              <li><strong>Authentication cookies:</strong> Expire based on your login session</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. Please check this page 
              periodically for updates.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">Contact Us</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-secondary/50 rounded-lg p-3 sm:p-4">
              <p className="text-foreground text-sm sm:text-base">Email: <a href="mailto:privacy@afiiia.com" className="text-primary hover:underline">privacy@afiiia.com</a></p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default CookiesPage;
