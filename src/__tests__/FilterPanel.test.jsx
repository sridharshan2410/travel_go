import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FilterPanel from "../components/FilterPanel";

describe("FilterPanel Component Testing", () => {
  const defaultProps = {
    destination: "",
    setDestination: vi.fn(),
    budget: "",
    setBudget: vi.fn(),
    duration: "",
    setDuration: vi.fn(),
    rating: "",
    setRating: vi.fn(),
  };

  it("displays destination and budget filter options", () => {
    render(<FilterPanel {...defaultProps} />);

    expect(screen.getByText("Find Your Perfect Trip")).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(4);
    expect(screen.getByRole("option", { name: "Goa" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Under ₹15,000" })
    ).toBeInTheDocument();
  });

  it("calls setDestination when a destination is selected", () => {
    const setDestination = vi.fn();

    render(
      <FilterPanel {...defaultProps} setDestination={setDestination} />
    );

    fireEvent.change(screen.getAllByRole("combobox")[0], {
      target: { value: "Goa" },
    });

    expect(setDestination).toHaveBeenCalledWith("Goa");
  });

  it("calls setBudget when a budget is selected", () => {
    const setBudget = vi.fn();

    render(<FilterPanel {...defaultProps} setBudget={setBudget} />);

    fireEvent.change(screen.getAllByRole("combobox")[1], {
      target: { value: "15000" },
    });

    expect(setBudget).toHaveBeenCalledWith("15000");
  });

  it("resets all filters when Reset Filters is clicked", () => {
    const setDestination = vi.fn();
    const setBudget = vi.fn();
    const setDuration = vi.fn();
    const setRating = vi.fn();

    render(
      <FilterPanel
        {...defaultProps}
        destination="Goa"
        budget="15000"
        duration="3"
        rating="4.5"
        setDestination={setDestination}
        setBudget={setBudget}
        setDuration={setDuration}
        setRating={setRating}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Reset Filters/i }));

    expect(setDestination).toHaveBeenCalledWith("");
    expect(setBudget).toHaveBeenCalledWith("");
    expect(setDuration).toHaveBeenCalledWith("");
    expect(setRating).toHaveBeenCalledWith("");
  });
});