import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";
import {
  BookingProvider,
  useBookingContext,
} from "../context/BookingContext";

vi.mock("../hooks/useBookingSearch", () => ({
  default: () => ({
    filteredPackages: [],
    loading: false,
    error: null,
    searchTerm: "",
    setSearchTerm: vi.fn(),
    destination: "",
    setDestination: vi.fn(),
    budget: "",
    setBudget: vi.fn(),
    duration: "",
    setDuration: vi.fn(),
    rating: "",
    setRating: vi.fn(),
  }),
}));

function createTestStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: { items: [] },
    },
  });
}

function createWrapper(store) {
  return function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BookingProvider>{children}</BookingProvider>
      </Provider>
    );
  };
}

describe("BookingContext Testing", () => {
  beforeEach(() => {
    localStorage.removeItem("travelCart");
  });

  it("calculates subtotal, 18% tax and total correctly", () => {
    const store = createTestStore();

    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 101, name: "Goa Package", price: 10000 },
    });

    const { result } = renderHook(() => useBookingContext(), {
      wrapper: createWrapper(store),
    });

    expect(result.current.subtotal).toBe(10000);
    expect(result.current.tax).toBe(1800);
    expect(result.current.total).toBe(11800);
  });

  it("updates traveler count", () => {
    const store = createTestStore();

    const { result } = renderHook(() => useBookingContext(), {
      wrapper: createWrapper(store),
    });

    act(() => {
      result.current.updateTravelers(3);
    });

    expect(result.current.travelers).toBe(3);
  });

  it("updates start and end travel dates", () => {
    const store = createTestStore();

    const { result } = renderHook(() => useBookingContext(), {
      wrapper: createWrapper(store),
    });

    act(() => {
      result.current.updateTravelDates("2026-12-10", "2026-12-15");
    });

    expect(result.current.startDate).toBe("2026-12-10");
    expect(result.current.endDate).toBe("2026-12-15");
  });

  it("starts with one traveler and empty travel dates", () => {
    const store = createTestStore();

    const { result } = renderHook(() => useBookingContext(), {
      wrapper: createWrapper(store),
    });

    expect(result.current.travelers).toBe(1);
    expect(result.current.startDate).toBe("");
    expect(result.current.endDate).toBe("");
  });
});