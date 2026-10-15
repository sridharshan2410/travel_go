import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import BookingsPage from "../pages/BookingsPage";
import {
  getBookings,
  updateBooking,
  deleteBooking,
} from "../services/api";

vi.mock("../services/api", () => ({
  getBookings: vi.fn(),
  updateBooking: vi.fn(),
  deleteBooking: vi.fn(),
}));

const mockBooking = {
  id: 1,
  bookingId: "TG101",
  status: "Confirmed",
  package: [
    {
      id: 101,
      name: "Goa Beach Escape",
      destination: "Goa",
      duration: 3,
      rating: 4.7,
      image: "/images/goa.jpg",
    },
  ],
  traveler: {
    name: "Test User",
    email: "test@example.com",
    phone: "9876543210",
  },
  travelers: 2,
  startDate: "2026-12-10",
  endDate: "2026-12-15",
  paymentMethod: "UPI",
  amount: 24000,
  bookingDate: "2026-10-15",
};

function renderBookingsPage() {
  return render(
    <MemoryRouter>
      <BookingsPage />
    </MemoryRouter>
  );
}

describe("BookingsPage Testing", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(window, "confirm").mockReturnValue(true);

    getBookings.mockResolvedValue([{ ...mockBooking }]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays booking details after loading", async () => {
    renderBookingsPage();

    expect(
      await screen.findByText("Goa Beach Escape")
    ).toBeInTheDocument();

    expect(screen.getByText("Booking ID: TG101")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("UPI")).toBeInTheDocument();
    expect(screen.getByText("₹24,000")).toBeInTheDocument();
  });

  it("shows a message when there are no bookings", async () => {
    getBookings.mockResolvedValue([]);

    renderBookingsPage();

    expect(
      await screen.findByText("No bookings available")
    ).toBeInTheDocument();
  });

  it("updates a booking successfully", async () => {
    updateBooking.mockResolvedValue({
      ...mockBooking,
      status: "Confirmed",
    });

    renderBookingsPage();

    fireEvent.click(
      await screen.findByRole("button", {
        name: /Update Booking/i,
      })
    );

    await waitFor(() => {
      expect(updateBooking).toHaveBeenCalledWith(1, {
        status: "Confirmed",
      });
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Booking updated successfully!"
    );
  });

  it("cancels and removes a booking after confirmation", async () => {
    deleteBooking.mockResolvedValue({});

    renderBookingsPage();

    fireEvent.click(
      await screen.findByRole("button", {
        name: /Cancel Booking/i,
      })
    );

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to cancel booking TG101?"
    );

    await waitFor(() => {
      expect(deleteBooking).toHaveBeenCalledWith(1);
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Booking cancelled successfully!"
    );

    expect(
      screen.queryByText("Booking ID: TG101")
    ).not.toBeInTheDocument();
  });

  it("does not cancel a booking when confirmation is declined", async () => {
    window.confirm.mockReturnValue(false);

    renderBookingsPage();

    fireEvent.click(
      await screen.findByRole("button", {
        name: /Cancel Booking/i,
      })
    );

    expect(deleteBooking).not.toHaveBeenCalled();

    expect(
      screen.getByText("Booking ID: TG101")
    ).toBeInTheDocument();
  });

  it("shows an error message when bookings fail to load", async () => {
    getBookings.mockRejectedValue(new Error("API unavailable"));

    renderBookingsPage();

    expect(
      await screen.findByRole("heading", {
        name: /Unable to load bookings/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Try Again/i })
    ).toBeInTheDocument();
  });
});