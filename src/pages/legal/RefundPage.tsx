import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RefundPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate dark:prose-invert max-w-none"
        >
          <h1 className="text-4xl font-serif font-bold text-gradient mb-2">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 15, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Policy</h2>
            <div className="bg-coral/10 border border-coral/30 rounded-lg p-4 mb-4">
              <p className="text-foreground font-medium mb-2">No Refunds for Active Subscriptions</p>
              <p className="text-muted-foreground">
                AFIIIA does not provide refunds for active subscription plans. Once you subscribe, 
                you have access to all features for the duration of your billing period. You can 
                cancel anytime to prevent future charges.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Free Trial</h2>
            <div className="bg-lavender/10 border border-lavender/30 rounded-lg p-4 mb-4">
              <p className="text-foreground font-medium mb-2">14-Day Free Trial</p>
              <p className="text-muted-foreground">
                All new users receive a 14-day free trial with full access to all features. 
                A valid payment method is required to start the trial. Cancel anytime before 
                the trial ends to avoid any charges.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Exception: Major Issues</h2>
            <p className="text-muted-foreground mb-4">
              We may consider refunds only in cases of major issues, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Significant technical issues that completely prevent you from using the service</li>
              <li>Billing errors or duplicate charges on our part</li>
              <li>Service outages lasting more than 7 consecutive days</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Each request is evaluated on a case-by-case basis. We reserve the right to 
              determine what constitutes a major issue.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How to Request a Refund</h2>
            <p className="text-muted-foreground mb-4">
              If you believe you qualify for a refund due to a major issue:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
              <li>
                <strong>Email us:</strong> Send a detailed request to{" "}
                <a href="mailto:support@afiiia.com" className="text-primary hover:underline">support@afiiia.com</a>
              </li>
              <li>
                <strong>Describe the issue:</strong> Provide a clear explanation of the major issue you experienced
              </li>
              <li>
                <strong>Include evidence:</strong> Screenshots, error messages, or other documentation supporting your claim
              </li>
              <li>
                <strong>Include your details:</strong> Your account email and transaction/order ID
              </li>
              <li>
                <strong>Wait for review:</strong> Our team will review your request within 5-7 business days
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Processing</h2>
            <p className="text-muted-foreground mb-4">
              If your refund request is approved:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Refunds are issued to the original payment method</li>
              <li>Credit card refunds may take 5-10 business days to appear</li>
              <li>Your subscription access will be terminated upon refund approval</li>
              <li>You will receive an email confirmation when the refund is processed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Non-Refundable Situations</h2>
            <p className="text-muted-foreground mb-4">
              Refunds will not be granted for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Change of mind or no longer wanting to use the service</li>
              <li>Not using the service during your billing period</li>
              <li>Minor bugs or issues that do not significantly impact functionality</li>
              <li>Accounts terminated due to Terms of Service violations</li>
              <li>Promotional or discounted subscriptions</li>
              <li>Requests made after account cancellation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cancellation vs. Refund</h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-foreground font-medium mb-2">Important Distinction:</p>
              <p className="text-muted-foreground mb-3">
                <strong>Cancellation</strong> stops future billing but you retain access until the end of your 
                current billing period. This is available to all users at any time.
              </p>
              <p className="text-muted-foreground">
                <strong>Refund</strong> returns your payment and immediately ends your subscription access. 
                This is only available in cases of major issues as described above.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              Questions about our refund policy? We are here to help.
            </p>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-foreground">Email: <a href="mailto:support@afiiia.com" className="text-primary hover:underline">support@afiiia.com</a></p>
              <p className="text-foreground mt-2">Response time: Within 24-48 hours</p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default RefundPage;
