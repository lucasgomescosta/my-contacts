import { renderHook } from "@testing-library/react";

import useSafeAsyncAction from "./useSafeAsyncAction";

describe("useSafeAsyncAction", () => {
  it("runs the callback while mounted", () => {
    const { result } = renderHook(() => useSafeAsyncAction());
    const callback = vi.fn();

    result.current(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not run the callback after unmount", () => {
    const { result, unmount } = renderHook(() => useSafeAsyncAction());
    const callback = vi.fn();
    const runSafeAsyncAction = result.current;

    unmount();
    runSafeAsyncAction(callback);

    expect(callback).not.toHaveBeenCalled();
  });
});
