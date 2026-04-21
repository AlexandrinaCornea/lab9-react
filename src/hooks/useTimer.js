import { useState, useEffect, useRef, useCallback } from "react";

export function useTimer(duration, onExpire, active = true) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!active || duration === null || timeLeft === null) return;
    if (timeLeft <= 0) {
      onExpireRef.current?.();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, active, duration]);

  const reset = useCallback(() => setTimeLeft(duration), [duration]);
  const percentage = duration ? (timeLeft / duration) * 100 : 100;

  return { timeLeft, reset, percentage };
}
