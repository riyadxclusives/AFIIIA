import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Only show on landing page
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    if (!isLandingPage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Show button when scrolled past 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible || !isLandingPage) return null;

  return (
    <Button
      variant="hero"
      size="icon"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-11 w-11 sm:h-12 sm:w-12 rounded-full shadow-elevated animate-fade-in"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default ScrollToTop;
