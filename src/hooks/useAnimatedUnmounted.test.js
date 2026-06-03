import { act, renderHook } from "@testing-library/react";

import useAnimatedUnmounted from "./useAnimatedUnmounted";

describe("useAnimatedUnmounted", () => {
  it("renders when visible is true", () => {
    const { result } = renderHook(() => useAnimatedUnmounted(true));

    expect(result.current.shouldRender).toBe(true);
  });

  it("keeps rendering until animation ends when visible becomes false", () => {
    const { result, rerender } = renderHook(
      ({ visible }) => useAnimatedUnmounted(visible),
      { initialProps: { visible: true } }
    );

    // still rendered after hiding — waits for animationend
    rerender({ visible: false });
    expect(result.current.shouldRender).toBe(true);
  });

  it("stops rendering after animationend fires", () => {
    const { result, rerender } = renderHook(
      ({ visible }) => useAnimatedUnmounted(visible),
      { initialProps: { visible: true } }
    );

    // attach a fake DOM element to the ref
    const fakeEl = document.createElement("div");
    act(() => {
      result.current.elementRef.current = fakeEl;
    });

    rerender({ visible: false });

    act(() => {
      fakeEl.dispatchEvent(new Event("animationend"));
    });

    expect(result.current.shouldRender).toBe(false);
  });

  it("resumes rendering when visible goes back to true", () => {
    const { result, rerender } = renderHook(
      ({ visible }) => useAnimatedUnmounted(visible),
      { initialProps: { visible: false } }
    );

    act(() => {
      result.current.setShouldRender(false);
    });

    rerender({ visible: true });
    expect(result.current.shouldRender).toBe(true);
  });
});
