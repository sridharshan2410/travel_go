import { getToken, removeToken } from "./auth";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:3001"
).replace(/\/+$/, "");

// Handle authentication for protected requests
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

  if (response.status === 401 || response.status === 403) {
    removeToken();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");
    window.dispatchEvent(new Event("travelgo:unauthorized"));
    throw new Error("Invalid or expired token. Please log in again.");
  }

  return response;
};

// GET: All travel packages
export const getPackages = async (signal) => {
  const response = await fetch(`${API_URL}/packages`, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch packages: ${response.status}`);
  }

  return response.json();
};

// GET: One travel package
export const getPackageById = async (id) => {
  const response = await fetch(`${API_URL}/packages/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch package: ${response.status}`);
  }

  return response.json();
};

// POST: Add a travel package
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

// GET: All bookings
export const getBookings = async () => {
  const response = await authorizedFetch(`${API_URL}/bookings`);

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.status}`);
  }

  return response.json();
};

// GET: One booking
export const getBookingById = async (id) => {
  const response = await authorizedFetch(`${API_URL}/bookings/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch booking: ${response.status}`);
  }

  return response.json();
};

// POST: Create a booking
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

// PATCH: Update a booking
export const updateBooking = async (id, bookingData) => {
  const response = await authorizedFetch(`${API_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update booking: ${response.status}`);
  }

  return response.json();
};

// DELETE: Cancel a booking
export const deleteBooking = async (id) => {
  const response = await authorizedFetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel booking: ${response.status}`);
  }

  return true;
};
