import React, { useState } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";

import classes from "./BookingItem.module.css";

const BookingItem = ({ booking, fetchAllBookings }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bookingDate, setBookingDate] = useState(booking.bookingDate);
  const [bookingTime, setBookingTime] = useState(booking.bookingTime);
  const [numberOfPeople, setNumberOfPeople] = useState(booking.numberOfPeople);
  const [email, setEmail] = useState(booking.email);

  const handleChanges = (e) => {
    e.preventDefault();

    axios
      .put("/api/booking", {
        bookingDate,
        bookingTime,
        numberOfPeople,
        email,
        bookingId: booking.id,
      })
      .then((res) => {
        fetchAllBookings();
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = () => {
    axios
      .delete(`/api/booking/${booking.id}`)
      .then((res) => {
        console.log(res);
        fetchAllBookings();
      })
      .catch((err) => console.log(err));
  };
  // console.log(bookingDate, new Date(booking.bookingDate));

  const officialDate = Date.parse(booking.bookingDate);
  const stringDate = new Date(officialDate);
  const dispalyBookingDate = new Date(
    stringDate.getTime() + stringDate.getTimezoneOffset() * 60000
  );

  return (
    <>
      {isEditing ? (
        <div className={classes["booking-card"]}>
          <form onSubmit={(e) => handleChanges(e)}>
            <input
              type="date"
              value={bookingDate.slice(0, 10)}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setBookingDate(e.target.value)}
            />
            <select
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            >
              <option>10:00</option>
              <option>15:00</option>
            </select>
            <select
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
            >
              {Array.from({ length: 6 }, (curr, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
          <button type="submit" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={classes["booking-card"]}>
          <span>
            <button
              onClick={() => {
                handleDelete();
              }}
            >
              Cancel
            </button>
            <NavLink to={`/checkout/${booking.id}`}>
              <button>Pay</button>
            </NavLink>
          </span>
          <h2>{booking.bookingTime === "10:00:00" ? "10 AM" : "3 PM"}</h2>
          <h2>{dispalyBookingDate.toDateString()}</h2>
          <h3>{booking.numberOfPeople} people</h3>
          <button onClick={() => setIsEditing(!isEditing)}>Reschdule</button>
        </div>
      )}
    </>
  );
};

export default BookingItem;
