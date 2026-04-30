import { useEffect, useRef, useCallback } from "react";

export default function useIsMounted() {
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const getIsMounted = useCallback(() => {
        return isMountedRef.current;
    }, []);

    return getIsMounted;
}
