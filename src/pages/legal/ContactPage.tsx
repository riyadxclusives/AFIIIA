import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, MapPin, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with your account or subscription",
      contact: "support@afiiia.com",
      color: "bg-coral/20 text-coral",
    },
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "Questions about AFIIIA or partnerships",
      contact: "hello@afiiia.com",
      color: "bg-lavender/20 text-lavender",
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically respond within",
      contact: "24-48 hours",
      color: "bg-teal-500/20 text-teal-600",
    },
  ];

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

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-gradient mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or need help with your account? We would love to hear from you. 
              Our team is here to support your wellness journey.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-glow-lavender transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${method.color}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                      <p className="text-primary font-medium">{method.contact}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Account Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="bug">Report a Bug</SelectItem>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="bg-secondary/50 resize-none"
                    rows={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h4 className="font-medium text-foreground mb-2">How do I cancel my subscription?</h4>
                    <p className="text-sm text-muted-foreground">
                      You can cancel your subscription anytime from Settings → Subscription in the app. 
                      You will retain access until the end of your billing period.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h4 className="font-medium text-foreground mb-2">Is my health data secure?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! We use industry-standard encryption and never sell your personal health data. 
                      See our Privacy Policy for details.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h4 className="font-medium text-foreground mb-2">Can I export my data?</h4>
                    <p className="text-sm text-muted-foreground">
                      Absolutely. Go to Settings → Privacy → Export Data to download all your information 
                      in a portable format.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <h4 className="font-medium text-foreground mb-2">How accurate are cycle predictions?</h4>
                    <p className="text-sm text-muted-foreground">
                      Our predictions improve over time as you log more data. Remember, these are estimates 
                      and not medical advice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-coral/10 to-lavender/10 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For urgent account or billing issues, email us directly and include 
                  &quot;URGENT&quot; in your subject line.
                </p>
                <a 
                  href="mailto:support@afiiia.com?subject=URGENT:" 
                  className="text-primary font-medium hover:underline"
                >
                  support@afiiia.com
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ContactPage;
