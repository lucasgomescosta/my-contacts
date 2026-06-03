import EventManager from "./EventManager";

describe("EventManager", () => {
  it("registers and emits listeners", () => {
    const eventManager = new EventManager();
    const listener = vi.fn();

    eventManager.on("change", listener);
    eventManager.emit("change", { id: 1 });

    expect(listener).toHaveBeenCalledWith({ id: 1 });
  });

  it("removes listeners", () => {
    const eventManager = new EventManager();
    const listener = vi.fn();

    eventManager.on("change", listener);
    eventManager.removeEventListener("change", listener);
    eventManager.emit("change", { id: 1 });

    expect(listener).not.toHaveBeenCalled();
  });
});
