import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

function useBookingCart() {

  const [cart, setCart] = useState(() => {

    const saved =
      localStorage.getItem("travelCart");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [travelers, setTravelers] =
    useState(1);

  useEffect(() => {

    localStorage.setItem(
      "travelCart",
      JSON.stringify(cart)
    );

  }, [cart]);

  const addToCart = useCallback((pkg) => {

    setCart((current) => {

      const exists =
        current.some(
          item => item.id === pkg.id
        );

      if (exists) {
        return current;
      }

      return [...current, pkg];
    });

  }, []);

  const removeFromCart = useCallback((id) => {

    setCart((current) =>
      current.filter(
        item => item.id !== id
      )
    );

  }, []);

  const clearCart = useCallback(() => {

    setCart([]);

  }, []);

  const updateTravelDates =
    useCallback((start, end) => {

      setStartDate(start);
      setEndDate(end);

    }, []);

  const updateTravelers =
    useCallback((count) => {

      setTravelers(Number(count));

    }, []);

  const tripDuration = useMemo(() => {

    if (!startDate || !endDate) {
      return 0;
    }

    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    const difference =
      end - start;

    return Math.max(
      0,
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      )
    );

  }, [startDate, endDate]);

  const packageCost = useMemo(() => {

    return cart.reduce(
      (total, pkg) =>
        total + pkg.price,
      0
    );

  }, [cart]);

  const travelerCost = useMemo(() => {

    return packageCost * travelers;

  }, [packageCost, travelers]);

  const discount = useMemo(() => {

    if (travelerCost >= 50000) {
      return travelerCost * 0.10;
    }

    if (travelerCost >= 30000) {
      return travelerCost * 0.05;
    }

    return 0;

  }, [travelerCost]);

  const taxes = useMemo(() => {

    return (
      (travelerCost - discount) *
      0.05
    );

  }, [travelerCost, discount]);

  const finalAmount = useMemo(() => {

    return (
      travelerCost -
      discount +
      taxes
    );

  }, [
    travelerCost,
    discount,
    taxes
  ]);

  return {

    cart,

    startDate,
    endDate,

    travelers,

    addToCart,
    removeFromCart,
    clearCart,

    updateTravelDates,
    updateTravelers,

    tripDuration,

    packageCost,
    travelerCost,
    discount,
    taxes,
    finalAmount
  };
}

export default useBookingCart;