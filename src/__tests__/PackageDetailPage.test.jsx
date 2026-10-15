import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import PackageDetailPage from "../pages/PackageDetailPage";
import { getPackageById } from "../services/api";

vi.mock("../services/api", () => ({
  getPackageById: vi.fn(),
}));

vi.mock("../context/BookingContext", () => ({
  useBookingContext: () => ({
    addToCart: vi.fn(),
  }),
  BookingProvider: ({ children }) => children,
}));

const mockPackage = {
  id: 101,
  name: "Goa Beach Escape",
  destination: "Goa",
  duration: 3,
  price: 12000,
  rating: 4.7,
  availability: 10,
  image: "/images/goa.jpg",
};

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/package/101"]}>
      <Routes>
        <Route
          path="/package/:id"
          element={<PackageDetailPage />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("PackageDetailPage Testing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading while package details are loading", () => {
    getPackageById.mockReturnValue(new Promise(() => {}));

    renderPage();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays package details after successful loading", async () => {
    getPackageById.mockResolvedValue(mockPackage);

    renderPage();

    expect(
      await screen.findByRole("heading", {
        name: "Goa Beach Escape",
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Goa Beach Escape" }))
      .toBeInTheDocument();

    expect(screen.getByText(/Duration:/)).toBeInTheDocument();
    expect(screen.getByText(/Rating:/)).toBeInTheDocument();
    expect(screen.getByText(/Available:/)).toBeInTheDocument();
    expect(screen.getByText(/12,000/)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Book This Package/i })
    ).toBeInTheDocument();
  });

  it("shows Package Not Found when the API request fails", async () => {
    getPackageById.mockRejectedValue(new Error("API unavailable"));

    renderPage();

    expect(
      await screen.findByRole("heading", {
        name: /Package Not Found/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Back to Packages/i })
    ).toBeInTheDocument();
  });

  it("calls the API with the package ID from the URL", async () => {
    getPackageById.mockResolvedValue(mockPackage);

    renderPage();

    await waitFor(() => {
      expect(getPackageById).toHaveBeenCalledWith("101");
    });
  });
});