import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const PrivacyPage = () => {
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
            <span className="text-sm sm:text-base">
              {getBackLabel()}
            </span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate dark:prose-invert max-w-none"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gradient mb-1 sm:mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">Last updated: January 15, 2024</p>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">1. Introduction</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              At AFIIIA, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our wellness application.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              We understand that health and wellness data is particularly sensitive. We are committed 
              to protecting your personal information and being transparent about our data practices.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2 sm:mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              <li><strong>Account Information:</strong> Email address, password, and profile details</li>
              <li><strong>Health Data:</strong> Menstrual cycle dates, symptoms, mood logs, and fertility tracking data</li>
              <li><strong>Body Metrics:</strong> Age, height, weight, and fitness goals</li>
              <li><strong>Activity Data:</strong> Workout logs, meal plans, hydration tracking</li>
              <li><strong>Preferences:</strong> Dietary preferences, allergies, workout preferences</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2 sm:mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li><strong>Device Information:</strong> Device type, operating system, browser type</li>
              <li><strong>Usage Data:</strong> Features used, time spent in app, interaction patterns</li>
              <li><strong>Log Data:</strong> IP address, access times, pages viewed</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">We use your information to:</p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li>Provide and personalize our wellness services</li>
              <li>Generate cycle predictions and fertility estimates</li>
              <li>Create AI-powered meal and workout recommendations</li>
              <li>Send you relevant notifications and reminders</li>
              <li>Improve and develop new features</li>
              <li>Ensure the security of your account</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">4. Data Sharing and Disclosure</h2>
            <div className="bg-lavender/10 border border-lavender/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-foreground font-medium text-sm sm:text-base">
                We do NOT sell your personal health data to third parties.
              </p>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">We may share your information only in these circumstances:</p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li><strong>Service Providers:</strong> With trusted partners who help us operate our service (e.g., cloud hosting, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share your data</li>
              <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated data for research purposes</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">5. Data Security</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and monitoring</li>
              <li>Row-level security on database tables</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">6. Your Rights and Choices</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">You have the right to:</p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your data</li>
              <li><strong>Export:</strong> Download your data in a portable format</li>
              <li><strong>Opt-out:</strong> Disable notifications and marketing communications</li>
            </ul>
            <p className="text-muted-foreground text-sm sm:text-base mt-3 sm:mt-4">
              To exercise these rights, visit your account settings or contact us at privacy@afiiia.com.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              We retain your personal data for as long as your account is active or as needed to 
              provide services. You can delete your account at any time, which will remove your 
              personal data from our systems within 30 days. Some data may be retained longer for 
              legal or legitimate business purposes.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">8. International Data Transfers</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Your data may be processed in countries other than your own. We ensure appropriate 
              safeguards are in place to protect your information in compliance with applicable 
              data protection laws, including GDPR for EU residents.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              AFIIIA is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information 
              from a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              We may update this Privacy Policy periodically. We will notify you of material changes 
              by email or through the app. Your continued use of AFIIIA after changes become 
              effective constitutes acceptance of the revised policy.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              For questions about this Privacy Policy or our data practices:
            </p>
            <div className="bg-secondary/50 rounded-lg p-3 sm:p-4">
              <p className="text-foreground text-sm sm:text-base">Email: <a href="mailto:privacy@afiiia.com" className="text-primary hover:underline">privacy@afiiia.com</a></p>
              <p className="text-foreground text-sm sm:text-base mt-2">Data Protection Officer: <a href="mailto:dpo@afiiia.com" className="text-primary hover:underline">dpo@afiiia.com</a></p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPage;
