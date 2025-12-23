import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "How It Works", href: "/#how-it-works" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refund" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img 
                src={logo} 
                alt="AFIIIA" 
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-cover"
              />
              <span className="font-serif text-xl sm:text-2xl font-semibold text-gradient">
                AFIIIA
              </span>
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Your AI-powered wellness companion, designed for women who want to understand 
              and embrace their natural rhythms.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} AFIIIA. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Made with 💜 for women everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
