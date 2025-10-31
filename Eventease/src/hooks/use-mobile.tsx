import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Run once on mount
    checkIsMobile();

    // Listen for resize changes
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
