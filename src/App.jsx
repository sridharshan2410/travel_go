import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import { store } from "./store/store";

import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const PackageDetailPage = lazy(() => import("./pages/PackageDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const BookingLayout = lazy(() => import("./pages/BookingLayout"));
const BookingDates = lazy(() => import("./pages/BookingDates"));
const BookingTravelers = lazy(() => import("./pages/BookingTravelers"));
const BookingSummary = lazy(() => import("./components/BookingSummary"));
const BookingPayment = lazy(() => import("./pages/BookingPayment"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const BookingsPage = lazy(() => import("./pages/BookingsPage"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/travel_go">
        <ErrorBoundary>
          <AuthProvider>
            <BookingProvider>
              <Header />

              <Suspense
                fallback={
                  <div className="loading-screen">
                    <h2>✈️ TravelGo</h2>
                    <p>Loading page...</p>
                  </div>
                }
              >
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />

                  {/* Protected Home */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Packages */}
                  <Route
                    path="/packages"
                    element={
                      <ProtectedRoute>
                        <PackagesPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Package Details */}
                  <Route
                    path="/package/:id"
                    element={
                      <ProtectedRoute>
                        <PackageDetailPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Cart */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Booking routes */}
                  <Route
                    path="/booking"
                    element={
                      <ProtectedRoute>
                        <BookingLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="dates" element={<BookingDates />} />
                    <Route path="travelers" element={<BookingTravelers />} />
                    <Route path="summary" element={<BookingSummary />} />
                    <Route path="payment" element={<BookingPayment />} />
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

                  {/* Protected Booking History */}
                  <Route
                    path="/bookings"
                    element={
                      <ProtectedRoute>
                        <BookingsPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>

              <Footer />
            </BookingProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;