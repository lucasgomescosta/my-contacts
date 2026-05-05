/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

export default function useAnimatedUnmounted({ visible }) {

  const [shouldRender, setShouldRender] = useState(visible);
  const elementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const currentElementRef = elementRef.current;
    if (!visible && currentElementRef) {
      currentElementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (currentElementRef) {
        currentElementRef.removeEventListener('animationend', handleAnimationEnd);
      }
    }
  }, [visible]);

  return {
    shouldRender,
    elementRef,
    setShouldRender
  }
}
