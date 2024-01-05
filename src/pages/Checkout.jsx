import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const { bookingId } = useParams();
  const [total, setTotal] = useState(null);

  const navigate = useNavigate();

  const handleCheckOut = async () => {
    try {
      const response = await axios.get(`/api/checkout/${bookingId}`);

      setTotal(response.data.numberOfPeople);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCheckOut();
  }, []);

  const handleStripe = () => {
    console.log("clicked payment");
    fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: bookingId }],
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then(({ url }) => {
        // console.log(url);
        window.location = url;
      })
      .catch((e) => console.error(e.error));
  };

  return (
    <main className={classes["checkout-container"]}>
      <div className={classes["checkout-card"]}>
        <h2>Number of People:{total}</h2>
        <h2>Price per Person:$75</h2>
        <h2>Your Total Order Amount Is: ${total * 75}</h2>
        <span>
          <button onClick={() => navigate(`/bookings`)}>Cancel</button>
          <button onClick={() => handleStripe()}>Continue</button>
        </span>
      </div>
    </main>
  );
};

export default Checkout;
