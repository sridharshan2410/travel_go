import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import { store } from "./store/store";

import { BookingProvider } from "./context/BookingContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import CartPage from "./pages/CartPage";
import BookingLayout from "./pages/BookingLayout";
import BookingDates from "./pages/BookingDates";
import BookingTravelers from "./pages/BookingTravelers";
import BookingSummary from "./components/BookingSummary";
import BookingPayment from "./pages/BookingPayment";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BookingsPage from "./pages/BookingsPage";


function HomeProtection() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <HomePage />;
}


function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>

        <ErrorBoundary>

          <AuthProvider>

            <BookingProvider>

              <Header />

              <Routes>

                {/* Login */}
                <Route
                  path="/login"
                  element={<LoginPage />}
                />

                <Route
                  path="/signup"
                  element={<SignupPage />}
                />

                {/* Home requires login */}
                <Route
                  path="/"
                  element={<HomeProtection />}
                />

                {/* Packages */}
                <Route
                  path="/packages"
                  element={<PackagesPage />}
                />

                {/* Package Details */}
                <Route
                  path="/package/:id"
                  element={<PackageDetailPage />}
                />

                {/* Cart */}
                <Route
                  path="/cart"
                  element={<CartPage />}
                />

                {/* Protected Booking */}
                <Route
                  path="/booking"
                  element={
                    <ProtectedRoute>
                      <BookingLayout />
                    </ProtectedRoute>
                  }
                >

                  <Route
                    path="dates"
                    element={<BookingDates />}
                  />

                  <Route
                    path="travelers"
                    element={<BookingTravelers />}
                  />

                  <Route
                    path="summary"
                    element={<BookingSummary />}
                  />

                  <Route
                    path="payment"
                    element={<BookingPayment />}
                  />

                </Route>

                {/* Protected Checkout */}
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Bookings */}
                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute>
                      <BookingsPage />
                    </ProtectedRoute>
                  }
                />

              </Routes>

              <Footer />

            </BookingProvider>

          </AuthProvider>

        </ErrorBoundary>

      </BrowserRouter>

    </Provider>
  );
}

export default App;