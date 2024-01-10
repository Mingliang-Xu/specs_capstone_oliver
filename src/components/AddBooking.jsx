import React, { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../store/AuthContext";

import classes from "./AddBooking.module.css";

const AddBooking = ({ fetchAllBookings }) => {
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [email, setEmail] = useState("");

  const { state, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/booking", {
        bookingTime,
        bookingDate: new Date(bookingDate),
        numberOfPeople,
        email,
        userId: state.userId,
      })
      .then((res) => {
        fetchAllBookings();
      })
      .catch((err) => {
        console.log(err);
      });
    setBookingTime("");
    setBookingDate("");
    setNumberOfPeople(0);
    setEmail("");
  };

  return (
    <>
      <form className={classes["booking-form"]} onSubmit={handleSubmit}>
        <input
          type="date"
          placeholder="choose a date"
          value={bookingDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />
        <select
          placeholder="choose a timeslot"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        >
          <option>Select a timeslot</option>
          <option>10:00</option>
          <option>15:00</option>
        </select>

        <select
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
        >
          <option>Number of people?</option>
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
          required
        />
        <button className={classes["add-btn"]} type="submit">
          Book Now
        </button>
      </form>
    </>
  );
};

export default AddBooking;
