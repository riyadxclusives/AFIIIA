import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Only show on landing page
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    if (!isLandingPage) {
      setIsVisible(false);
      return;
    }

    // Initialize lastScrollY
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;
      const notAtTop = currentScrollY > 100;
      
      // Show only when scrolling UP and not at top
      // Hide immediately when scrolling DOWN
      if (scrollingUp && notAtTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
