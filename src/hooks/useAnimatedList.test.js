import { act, renderHook } from "@testing-library/react";

import useAnimatedList from "./useAnimatedList";

describe("useAnimatedList", () => {
  it("initializes with given items", () => {
    const items = [{ id: 1 }, { id: 2 }];
    const { result } = renderHook(() => useAnimatedList(items));

    expect(result.current.items).toEqual(items);
  });

  it("marks an item as pending removal", () => {
    const items = [{ id: 1 }, { id: 2 }];
    const { result } = renderHook(() => useAnimatedList(items));

    // handleRemoveItem puts the id in pendingRemovalItemsIds, which
    // renderList then exposes via isLeaving
    act(() => {
      result.current.handleRemoveItem(1);
    });

    let leavingId = null;
    result.current.renderList((item, { isLeaving }) => {
      if (isLeaving) leavingId = item.id;
      return null;
    });

    expect(leavingId).toBe(1);
  });

  it("removes item from the list after animationend", () => {
    const items = [{ id: 1 }, { id: 2 }];
    const { result } = renderHook(() => useAnimatedList(items));

    const fakeEl = document.createElement("div");

    // Pre-populate the ref BEFORE calling handleRemoveItem so the effect finds it
    result.current.renderList((item, { animatedRef }) => {
      if (item.id === 1) animatedRef.current = fakeEl;
      return null;
    });

    // Mark item for removal — effect will now find the ref and attach the listener
    act(() => {
      result.current.handleRemoveItem(1);
    });

    act(() => {
      fakeEl.dispatchEvent(new Event("animationend"));
    });

    expect(result.current.items.find((i) => i.id === 1)).toBeUndefined();
  });

  it("allows updating items via setItems", () => {
    const { result } = renderHook(() => useAnimatedList([]));

    act(() => {
      result.current.setItems([{ id: 99 }]);
    });

    expect(result.current.items).toEqual([{ id: 99 }]);
  });
});
