import React, {
  createContext,
  useContext,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} from "../store/cartSlice";

import useBookingSearch from "../hooks/useBookingSearch";

const BookingContext = createContext();

export function BookingProvider({ children }) {

  // REST API search state
  const bookingSearch = useBookingSearch();

  // Redux
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // Cart operations
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(
      updateQuantity({
        id,
        quantity
      })
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };


  // Cart derived state
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const tax = subtotal * 0.18;

  const total = subtotal + tax;


  // Existing booking states
  const [selectedPackage, setSelectedPackage] =
    useState(null);

  const [traveler, setTraveler] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [bookingInfo, setBookingInfo] =
    useState(null);


  return (
    <BookingContext.Provider
      value={{

        // REST API search
        ...bookingSearch,

        // Redux Cart
        cartItems,

        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        clearCart: handleClearCart,

        // Derived cart values
        subtotal,
        tax,
        total,

        // Booking states
        selectedPackage,
        setSelectedPackage,

        traveler,
        setTraveler,

        bookingInfo,
        setBookingInfo
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}


export function useBookingContext() {
  return useContext(BookingContext);
}