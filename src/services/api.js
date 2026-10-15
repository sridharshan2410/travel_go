
import { getToken, removeToken } from "./auth";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:3001"
).replace(/\/+$/, "");

// Attach authentication token to protected API requests
const authorizedFetch = async (url, options = {}) => {
  const token = getToken();

  if (!token) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");

    window.dispatchEvent(new Event("travelgo:unauthorized"));

    throw new Error("Session expired. Please log in again.");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle invalid or expired tokens when the server rejects them
  if (response.status === 401 || response.status === 403) {
    removeToken();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");

    window.dispatchEvent(new Event("travelgo:unauthorized"));

    throw new Error(
      "Invalid or expired token. Please log in again."
    );
  }

  return response;
};


 // GET - Retrieve all travel packages (public)
export const getPackages = async (signal) => {
  const response = await fetch(`${API_URL}/packages`, {
    signal
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch packages: ${response.status}`);
  }

  return response.json();
};


// GET - Retrieve a travel package by ID (public)
export const getPackageById = async (id) => {
  const response = await fetch(`${API_URL}/packages/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch package: ${response.status}`);
  }

  return response.json();
};

// POST - Add a travel package (public for current coursework setup)
export const addPackage = async (packageData) => {
  const response = await fetch(`${API_URL}/packages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(packageData),
  });

  if (!response.ok) {
    throw new Error(`Failed to add package: ${response.status}`);
  }

  return response.json();
};

// GET - Retrieve booking history (protected)
export const getBookings = async () => {
  const response = await authorizedFetch(`${API_URL}/bookings`);

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.status}`);
  }

  return response.json();
};

// GET - Retrieve one booking (protected)
export const getBookingById = async (id) => {
  const response = await authorizedFetch(
    `${API_URL}/bookings/${id}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch booking: ${response.status}`);
  }

  return response.json();
};

// POST - Create a booking (protected)
export const addBooking = async (bookingData) => {
  const response = await authorizedFetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create booking: ${response.status}`);
  }

  return response.json();
};

// PATCH - Update a booking (protected)
export const updateBooking = async (id, bookingData) => {
  const response = await authorizedFetch(
    `${API_URL}/bookings/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update booking: ${response.status}`);
  }

  return response.json();
};

// DELETE - Cancel a booking (protected)
export const deleteBooking = async (id) => {
  const response = await authorizedFetch(
    `${API_URL}/bookings/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to cancel booking: ${response.status}`);
  }

  return true;
};