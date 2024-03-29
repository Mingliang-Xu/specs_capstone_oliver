import React, { useState, useContext } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

import AuthContext from "../store/AuthContext";

import BookingItem from "./BookingItem";
import AddBooking from "../components/AddBooking";

import classes from "./Booking.module.css";

export const viewAllBookings = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`/api/bookings/${userId}`);
  return response.data;
};
const Booking = () => {
  const { state } = useContext(AuthContext);
  const [allBookings, setAllBookings] = useState(useLoaderData());

  // const allBookings = useLoaderData();
  // console.log(allBookings);

  const fetchAllBookings = () => {
    axios
      .get(`/api/bookings/${state.userId}`)
      .then((res) => setAllBookings(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <main className={classes.layout}>
      {state.userId && <AddBooking fetchAllBookings={fetchAllBookings} />}
      <div className={classes["booking-container"]}>
        {state.userId &&
          allBookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={booking}
              fetchAllBookings={fetchAllBookings}
            />
          ))}
      </div>
    </main>
  );
};

export default Booking;
