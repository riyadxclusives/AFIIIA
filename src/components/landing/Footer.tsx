import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're not on the landing page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const productLinks = [
    { name: "Features", sectionId: "features" },
    { name: "How It Works", sectionId: "how-it-works" },
    { name: "Testimonials", sectionId: "testimonials" },
    { name: "Pricing", sectionId: "pricing" },
    { name: "FAQ", sectionId: "faq" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Help Center", href: "/help" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
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
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs">
              Your AI-powered wellness companion, designed for women who want to understand 
              and embrace their natural rhythms.
            </p>
          </div>

          {/* Product Links - all landing page sections */}
          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={`#${link.sectionId}`}
                    onClick={(e) => handleSectionClick(e, link.sectionId)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {legalLinks.map((link) => (
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
            <ul className="space-y-2 sm:space-y-2.5">
              {supportLinks.map((link) => (
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
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} AFIIIA. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
            Made with 💜 for women everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
