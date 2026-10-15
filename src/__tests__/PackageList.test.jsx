import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PackageList from "../components/PackageList";
import { useBookingContext } from "../context/BookingContext";

vi.mock("../context/BookingContext", () => ({
  useBookingContext: vi.fn(),
}));

vi.mock("../components/PackageCard", () => ({
  default: ({ packageData }) => (
    <div data-testid="package-card">
      <h2>{packageData.name}</h2>
    </div>
  ),
}));

vi.mock("../components/Loading", () => ({
  default: () => <div>Loading packages...</div>,
}));

describe("PackageList Component Testing", () => {
  it("displays available travel packages", () => {
    useBookingContext.mockReturnValue({
      filteredPackages: [
        { id: 101, name: "Goa Beach Escape" },
        { id: 102, name: "Ooty Hill Station" },
      ],
      loading: false,
      error: null,
    });

    render(<PackageList />);

    expect(screen.getByText("Goa Beach Escape")).toBeInTheDocument();
    expect(screen.getByText("Ooty Hill Station")).toBeInTheDocument();
    expect(screen.getAllByTestId("package-card")).toHaveLength(2);
  });

  it("displays only the packages supplied after filtering", () => {
    useBookingContext.mockReturnValue({
      filteredPackages: [
        { id: 101, name: "Goa Beach Escape" },
      ],
      loading: false,
      error: null,
    });

    render(<PackageList />);

    expect(screen.getByText("Goa Beach Escape")).toBeInTheDocument();
    expect(screen.queryByText("Ooty Hill Station")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("package-card")).toHaveLength(1);
  });

  it("displays loading component while packages are loading", () => {
    useBookingContext.mockReturnValue({
      filteredPackages: [],
      loading: true,
      error: null,
    });

    render(<PackageList />);

    expect(screen.getByText("Loading packages...")).toBeInTheDocument();
  });

  it("displays a message when no packages are found", () => {
    useBookingContext.mockReturnValue({
      filteredPackages: [],
      loading: false,
      error: null,
    });

    render(<PackageList />);

    expect(screen.getByText("No packages found.")).toBeInTheDocument();
  });

  it("displays an error message when loading fails", () => {
    useBookingContext.mockReturnValue({
      filteredPackages: [],
      loading: false,
      error: "Failed to load packages",
    });

    render(<PackageList />);

    expect(screen.getByText("Failed to load packages")).toBeInTheDocument();
  });
});