/**
 * Hook for native-like haptic feedback
 * Uses the Vibration API where available
 */
export const useHapticFeedback = () => {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const light = () => {
    if (isSupported) {
      navigator.vibrate(10);
    }
  };

  const medium = () => {
    if (isSupported) {
      navigator.vibrate(25);
    }
  };

  const heavy = () => {
    if (isSupported) {
      navigator.vibrate(50);
    }
  };

  const success = () => {
    if (isSupported) {
      navigator.vibrate([10, 50, 20]);
    }
  };

  const error = () => {
    if (isSupported) {
      navigator.vibrate([50, 30, 50, 30, 50]);
    }
  };

  return {
    isSupported,
    light,
    medium,
    heavy,
    success,
    error,
  };
};

export default useHapticFeedback;
