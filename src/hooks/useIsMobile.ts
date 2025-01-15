import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the viewport width is below a specified breakpoint.
 * @param breakpoint - The width in pixels to determine mobile view. Default is 768.
 * @returns A boolean indicating whether the viewport is below the breakpoint.
 */
function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
