import { useEffect } from "react";

export const useClickOutside = (refs, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const isOutside = refs.every(
        (ref) => !ref.current || !ref.current.contains(event.target)
      );
      if (isOutside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
};
