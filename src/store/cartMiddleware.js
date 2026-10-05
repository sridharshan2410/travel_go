const cartMiddleware = (store) => (next) => (action) => {

  const result = next(action);

  if (action.type.startsWith("cart/")) {

    const cartItems = store.getState().cart.items;

    localStorage.setItem(
      "travelCart",
      JSON.stringify(cartItems)
    );

    console.log("Cart Action:", action.type);
    console.log("Cart Items:", cartItems);
  }

  return result;
};

export default cartMiddleware;