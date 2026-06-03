import { vi } from "vitest";

import toast, { toastEventManager } from "./toast";

describe("toast", () => {
  it("emits an addtoast event", () => {
    const emitSpy = vi.spyOn(toastEventManager, "emit");

    toast({ type: "success", text: "Salvo com sucesso", duration: 3000 });

    expect(emitSpy).toHaveBeenCalledWith("addtoast", {
      type: "success",
      text: "Salvo com sucesso",
      duration: 3000,
    });

    emitSpy.mockRestore();
  });
});
