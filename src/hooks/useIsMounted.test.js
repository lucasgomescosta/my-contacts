import { renderHook } from "@testing-library/react";

import useIsMounted from "./useIsMounted";

describe("useIsMounted", () => {
  it("returns true while the component is mounted", () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current()).toBe(true);
  });

  it("returns false after the component unmounts", () => {
    const { result, unmount } = renderHook(() => useIsMounted());

    unmount();

    expect(result.current()).toBe(false);
  });
});
