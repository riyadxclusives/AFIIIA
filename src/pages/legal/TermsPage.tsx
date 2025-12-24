import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const TermsPage = () => {
  const { isAuthenticated } = useAuth();
  const { getHomeRoute } = useAuthNavigation();

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
              {isAuthenticated ? "Back to Home" : "Back to Landing"}
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gradient mb-1 sm:mb-2">Terms of Service</h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">Last updated: January 15, 2024</p>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              By accessing or using AFIIIA ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our Service.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              AFIIIA is a wellness application designed to help women track their menstrual cycles, 
              plan meals, organize workouts, and monitor their overall wellbeing. The Service is 
              provided for informational purposes only and is not intended to replace professional 
              medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              You must be at least 13 years old to use AFIIIA. If you are under 18, you must have 
              parental or guardian consent to use the Service. By using AFIIIA, you represent and 
              warrant that you meet these eligibility requirements.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">3. Account Registration</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              To access certain features of AFIIIA, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">4. Medical Disclaimer</h2>
            <div className="bg-coral/10 border border-coral/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-foreground font-medium mb-2 text-sm sm:text-base">Important Notice:</p>
              <p className="text-muted-foreground text-sm sm:text-base">
                AFIIIA is NOT a medical device and does NOT provide medical advice. The information 
                provided through our Service, including cycle predictions, fertility estimates, and 
                AI-generated recommendations, is for informational purposes only.
              </p>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              Always consult with a qualified healthcare provider before making any decisions related 
              to your health, including but not limited to:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li>Family planning or contraception</li>
              <li>Pregnancy-related concerns</li>
              <li>Diet and nutrition changes</li>
              <li>Exercise programs</li>
              <li>Mental health concerns</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">5. Subscription and Payments</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">
              AFIIIA offers subscription plans (Bloom and Radiance) with different features and pricing. 
              By subscribing, you agree to:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li>Pay the applicable subscription fees</li>
              <li>Automatic renewal of your subscription unless cancelled</li>
              <li>Provide valid payment information</li>
            </ul>
            <p className="text-muted-foreground text-sm sm:text-base mt-3 sm:mt-4">
              Subscription fees are billed in advance on a monthly or annual basis. You may cancel 
              your subscription at any time through your account settings.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">6. User Content</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              You retain ownership of any content you submit to AFIIIA, including health data, 
              notes, and preferences. By submitting content, you grant us a license to use, 
              process, and store this information to provide and improve our Service.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">7. Prohibited Uses</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">You agree not to:</p>
            <ul className="list-disc pl-5 sm:pl-6 text-muted-foreground text-sm sm:text-base space-y-1.5 sm:space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Share your account credentials with others</li>
              <li>Use the Service to harm or harass others</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              To the maximum extent permitted by law, AFIIIA and its affiliates shall not be liable 
              for any indirect, incidental, special, consequential, or punitive damages arising from 
              your use of the Service. Our total liability shall not exceed the amount you paid for 
              the Service in the twelve months preceding the claim.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              We may update these Terms of Service from time to time. We will notify you of any 
              material changes by posting the new terms on this page and updating the "Last updated" 
              date. Your continued use of the Service after changes become effective constitutes 
              acceptance of the revised terms.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-foreground text-sm sm:text-base mt-2">
              Email: <a href="mailto:legal@afiiia.com" className="text-primary hover:underline">legal@afiiia.com</a>
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsPage;
