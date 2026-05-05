import { useCallback, useState, useRef, useEffect } from "react";

export default function useAnimatedList(initialValue = []) {
    const [items, setItems] = useState(initialValue);
    const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

    const animatedRefs = useRef(new Map());
    const animationEndListeners = useRef(new Map());

    const handleRemoveItem = useCallback((id) => {
      setPendingRemovalItemsIds(prevState => [...prevState, id]);
    }, [])

    const handleAnimationEnd = useCallback((itemId) => {
      const removeListener = animationEndListeners.current.get(itemId);
      removeListener();

      animationEndListeners.current.delete(itemId);
      animatedRefs.current.delete(itemId);

      setItems(prevState => prevState.filter(item => item.id !== itemId));
      setPendingRemovalItemsIds(prevState => prevState.filter((id) => id !== itemId));
    }, []);

    useEffect(() => {
      pendingRemovalItemsIds.forEach((itemId) => {
        const animatedRef = animatedRefs.current.get(itemId);
        const animatedElement = animatedRef?.current;
        const alreadyHasListener = animationEndListeners.current.has(itemId);

        if(!alreadyHasListener && animatedElement) {
          const onAnimatedEnd = () => handleAnimationEnd(itemId);
          const removeListener = () => {
            animatedElement.removeEventListener('animationend', onAnimatedEnd);
          };

          animatedElement.addEventListener('animationend', onAnimatedEnd);
          animationEndListeners.current.set(itemId, removeListener);
        }
      });

    }, [handleAnimationEnd, pendingRemovalItemsIds]);

    useEffect(() => {
      const removeListeners = animationEndListeners.current;

      return () => {
        removeListeners.forEach(removeListener => removeListener());
      }
    }, []);

    const getAnimatedRef = useCallback((id) => {
      let animatedRef = animatedRefs.current.get(id);

      if(!animatedRef) {
        animatedRef = { current: null }
        animatedRefs.current.set(id, animatedRef);
      }
      return animatedRef;
    }, []);

    const renderList = useCallback((renderItem) => {
      return items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);
        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, { isLeaving, animatedRef });
      });
    }, [getAnimatedRef, items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  }
}
