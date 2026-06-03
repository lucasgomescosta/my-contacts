import { act, renderHook } from "@testing-library/react";

import useSafeAsyncState from "./useSafeAsyncState";

describe("useSafeAsyncState", () => {
  it("updates state while mounted", () => {
    const { result } = renderHook(() => useSafeAsyncState(0));

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
  });

  it("does not update state after unmount", () => {
    const { result, unmount } = renderHook(() => useSafeAsyncState(0));
    const setSafe = result.current[1];

    unmount();

    // calling after unmount should be a no-op (no React state update warning)
    act(() => {
      setSafe(99);
    });

    expect(result.current[0]).toBe(0);
  });
});
