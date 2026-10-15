import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useBookingSearch from "../hooks/useBookingSearch";
import { getPackages } from "../services/api";

vi.mock("../services/api", () => ({
  getPackages: vi.fn(),
}));

const mockPackages = [
  {
    id: 101,
    name: "Goa Beach Escape",
    destination: "Goa",
    price: 12000,
    duration: 3,
    rating: 4.7,
  },
  {
    id: 102,
    name: "Ooty Hill Station",
    destination: "Ooty",
    price: 8000,
    duration: 4,
    rating: 4.5,
  },
  {
    id: 103,
    name: "Kerala Backwaters",
    destination: "Kerala",
    price: 18000,
    duration: 5,
    rating: 4.8,
  },
];

describe("useBookingSearch Hook Testing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPackages.mockResolvedValue(mockPackages);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  async function loadHook() {
    const hook = renderHook(() => useBookingSearch());

    await waitFor(
      () => {
        expect(hook.result.current.loading).toBe(false);
      },
      { timeout: 5000 }
    );

    return hook;
  }

  it("loads travel packages from the API", async () => {
    const { result } = await loadHook();

    expect(getPackages).toHaveBeenCalledTimes(1);
    expect(result.current.packages).toHaveLength(3);
    expect(result.current.error).toBe("");
  });

  it("filters packages by destination", async () => {
    const { result } = await loadHook();

    act(() => result.current.setDestination("Goa"));

    expect(result.current.filteredPackages.map((pkg) => pkg.name))
      .toEqual(["Goa Beach Escape"]);
  });

  it("filters packages by maximum budget", async () => {
    const { result } = await loadHook();

    act(() => result.current.setBudget("12000"));

    expect(result.current.filteredPackages.map((pkg) => pkg.name))
      .toEqual(["Goa Beach Escape", "Ooty Hill Station"]);
  });

  it("filters packages by maximum duration", async () => {
    const { result } = await loadHook();

    act(() => result.current.setDuration("3"));

    expect(result.current.filteredPackages.map((pkg) => pkg.name))
      .toEqual(["Goa Beach Escape"]);
  });

  it("filters packages by minimum rating", async () => {
    const { result } = await loadHook();

    act(() => result.current.setRating("4.8"));

    expect(result.current.filteredPackages.map((pkg) => pkg.name))
      .toEqual(["Kerala Backwaters"]);
  });

  it("searches packages by name", async () => {
    const { result } = await loadHook();

    act(() => result.current.setSearchTerm("Ooty"));

    expect(result.current.filteredPackages.map((pkg) => pkg.name))
      .toEqual(["Ooty Hill Station"]);
  });

  it("shows an error when the API request fails", async () => {
    getPackages.mockRejectedValueOnce(new Error("API unavailable"));

    const { result } = renderHook(() => useBookingSearch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to load travel packages.");
  });
});