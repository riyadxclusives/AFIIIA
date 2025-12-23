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
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
            <p className="text-muted-foreground">
              At AFIIIA, we want you to be completely satisfied with your subscription. We offer 
              a straightforward refund policy to ensure you can try our service with confidence.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Free Trial</h2>
            <div className="bg-lavender/10 border border-lavender/30 rounded-lg p-4 mb-4">
              <p className="text-foreground font-medium mb-2">7-Day Free Trial</p>
              <p className="text-muted-foreground">
                All new users receive a 7-day free trial with full access to all features. 
                You will not be charged during the trial period. Cancel anytime before the 
                trial ends to avoid any charges.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Eligibility</h2>
            
            <h3 className="text-xl font-medium text-foreground mb-3">Monthly Subscriptions</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Full refund within 7 days of initial purchase</li>
              <li>Partial refunds not available after 7 days</li>
              <li>Cancel anytime to prevent future charges</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mb-3">Annual Subscriptions</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Full refund within 14 days of initial purchase</li>
              <li>Pro-rated refund available within first 30 days</li>
              <li>No refunds after 30 days from purchase date</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How to Request a Refund</h2>
            <p className="text-muted-foreground mb-4">
              To request a refund, please follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-3">
              <li>
                <strong>Email us:</strong> Send a refund request to{" "}
                <a href="mailto:support@afiiia.com" className="text-primary hover:underline">support@afiiia.com</a>
              </li>
              <li>
                <strong>Include your details:</strong> Provide your account email and order/transaction ID
              </li>
              <li>
                <strong>Reason (optional):</strong> Let us know why you are requesting a refund so we can improve
              </li>
              <li>
                <strong>Wait for confirmation:</strong> We will process your request within 3-5 business days
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Processing</h2>
            <p className="text-muted-foreground mb-4">
              Once approved, refunds are processed as follows:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Refunds are issued to the original payment method</li>
              <li>Credit card refunds may take 5-10 business days to appear</li>
              <li>PayPal refunds are typically processed within 3-5 business days</li>
              <li>You will receive an email confirmation when the refund is processed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Non-Refundable Items</h2>
            <p className="text-muted-foreground mb-4">
              The following are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Subscriptions cancelled after the refund eligibility period</li>
              <li>Accounts terminated due to Terms of Service violations</li>
              <li>Promotional or discounted subscriptions (unless otherwise stated)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cancellation vs. Refund</h2>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-foreground font-medium mb-2">Important Distinction:</p>
              <p className="text-muted-foreground mb-3">
                <strong>Cancellation</strong> stops future billing but you retain access until the end of your 
                current billing period.
              </p>
              <p className="text-muted-foreground">
                <strong>Refund</strong> returns your payment and immediately ends your subscription access.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Exceptions</h2>
            <p className="text-muted-foreground">
              We may make exceptions to this policy in cases of:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Technical issues that prevented you from using the service</li>
              <li>Billing errors on our part</li>
              <li>Extenuating circumstances (evaluated case-by-case)</li>
            </ul>
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
