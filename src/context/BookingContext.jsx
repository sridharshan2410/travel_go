
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

  // Cart calculations
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  // Booking states
  const [selectedPackage, setSelectedPackage] =
    useState(null);

  const [traveler, setTraveler] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [travelers, setTravelers] = useState(1);

const updateTravelers = (value) => {
  setTravelers(value);
};

  const [bookingInfo, setBookingInfo] =
    useState(null);

  // Travel dates: store as YYYY-MM-DD strings
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Update both dates together
  const updateTravelDates = (
    newStartDate,
    newEndDate
  ) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <BookingContext.Provider
      value={{
        // REST API search
        ...bookingSearch,

        // Redux cart
        cartItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        clearCart: handleClearCart,

        // Cart totals
        subtotal,
        tax,
        total,

        // Booking information
        selectedPackage,
        setSelectedPackage,
        traveler,
        setTraveler,
        bookingInfo,
        setBookingInfo,

        // Travel dates
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        updateTravelDates,

        travelers,
        setTravelers,
        updateTravelers
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  return useContext(BookingContext);
}