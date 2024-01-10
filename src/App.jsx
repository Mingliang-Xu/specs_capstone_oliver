import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingItem from "./pages/BookingItem";
import Review from "./pages/Review";
import ReviewItem from "./pages/ReviewItem";
import Root from "./pages/Root";
import { viewAllBookings } from "./pages/Booking";
import { viewAllReviews } from "./pages/Review";
// import { viewAllPublishedReviews } from "./pages/Home";

import Checkout from "./pages/Checkout";
import AuthContext from "./store/AuthContext";
import axios from "axios";

import "./App.css";

export const viewAllPublishedReviews = async () => {
  const response = await axios.get(`/api/reviews`);
  return response.data;
};

function App() {
  const { state } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // loader: viewAllPublishedReviews,
      children: [
        {
          index: true,
          element: state.userId && <Home />,
          loader: viewAllPublishedReviews,
        },
        { path: "bookings", element: <Booking />, loader: viewAllBookings },
        { path: "reviews", element: <Review />, loader: viewAllReviews },
        { path: "bookings/:id", element: <BookingItem /> },
        { path: "reviews/:id", element: <ReviewItem /> },
        { path: "checkout/:bookingId", element: state.userId && <Checkout /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
