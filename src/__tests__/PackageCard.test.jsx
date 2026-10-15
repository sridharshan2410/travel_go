import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import { useBookingContext } from "../context/BookingContext";
const mockNavigate = vi.fn();
const mockAddToCart = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../context/BookingContext", () => ({
  useBookingContext: vi.fn(),
}));

const packageData = {
  id: 101,
  name: "Goa Beach Escape",
  destination: "Goa",
  duration: 3,
  rating: 4.7,
  price: 12000,
  image: "/images/goa.jpg",
};

describe("PackageCard Component Testing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useBookingContext.mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  it("displays package name, destination, duration, rating and price", () => {
    render(
      <MemoryRouter>
        <PackageCard packageData={packageData} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Goa Beach Escape" })
    ).toBeInTheDocument();

    expect(screen.getByText("📍 Goa")).toBeInTheDocument();
    expect(screen.getByText("🗓️ 3 Days")).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.7")).toBeInTheDocument();
    expect(screen.getByText("₹12,000")).toBeInTheDocument();
  });

  it("navigates to the package details when View Package is clicked", () => {
    render(
      <MemoryRouter>
        <PackageCard packageData={packageData} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /View Package/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/package/101");
  });

  it("adds the package to cart when Add to Cart is clicked", () => {
    render(
      <MemoryRouter>
        <PackageCard packageData={packageData} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Add to Cart/i }));

    expect(mockAddToCart).toHaveBeenCalledWith(packageData);
  });
});