import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingUp = currentScrollY < lastScrollY.current;
          const notAtTop = currentScrollY > 100;
          
          console.log('Scroll:', { currentScrollY, lastScrollY: lastScrollY.current, scrollingUp, notAtTop });
          
          if (scrollingUp && notAtTop) {
            setIsVisible(true);
          } else if (!scrollingUp || !notAtTop) {
            setIsVisible(false);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

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
