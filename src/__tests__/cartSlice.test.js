import { describe, it, expect, beforeEach } from "vitest";
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";

const goaPackage = {
  id: 101,
  name: "Goa Beach Escape",
  price: 12000,
};

const ootyPackage = {
  id: 102,
  name: "Ooty Hill Station",
  price: 8000,
};

describe("Cart Slice Testing", () => {
  let initialState;

  beforeEach(() => {
    initialState = { items: [] };
  });

  it("adds a package to the cart", () => {
    const state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe("Goa Beach Escape");
    expect(state.items[0].quantity).toBe(1);
  });

  it("increases quantity when the same package is added again", () => {
    let state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    state = cartReducer(state, addToCart(goaPackage));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("adds different packages separately", () => {
    let state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    state = cartReducer(state, addToCart(ootyPackage));

    expect(state.items).toHaveLength(2);
  });

  it("removes a package from the cart", () => {
    let state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    state = cartReducer(state, addToCart(ootyPackage));
    state = cartReducer(state, removeFromCart(101));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(102);
  });

  it("updates package quantity", () => {
    let state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    state = cartReducer(
      state,
      updateQuantity({ id: 101, quantity: 3 })
    );

    expect(state.items[0].quantity).toBe(3);
  });

  it("does not allow quantity below one", () => {
    let state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    state = cartReducer(
      state,
      updateQuantity({ id: 101, quantity: 0 })
    );

    expect(state.items[0].quantity).toBe(1);
  });

  it("clears all packages from the cart", () => {
    let state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    state = cartReducer(state, addToCart(ootyPackage));
    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
  });

  it("keeps the state unchanged when removing a missing package", () => {
    let state = cartReducer(
      initialState,
      addToCart(goaPackage)
    );

    state = cartReducer(state, removeFromCart(999));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(101);
  });
});