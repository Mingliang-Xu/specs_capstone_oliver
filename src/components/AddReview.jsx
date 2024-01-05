import React, { useState, useContext } from "react";
import axios from "axios";

import AuthContext from "../store/AuthContext";

import classes from "./AddReview.module.css";

const AddReview = ({ fetchAllReviews }) => {
  const [reviewDate, setReviewDate] = useState("");
  const [description, setDescription] = useState("");

  const { state, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/review", {
        reviewDate: new Date(reviewDate),
        description,
        userId: state.userId,
      })
      .then((res) => {
        fetchAllReviews();
      })
      .catch((err) => {
        console.log(err);
      });

    setReviewDate("");
    setDescription("");
  };

  return (
    <>
      <form className={classes["review-form"]} onSubmit={handleSubmit}>
        {/* <input
          className={classes["date-input"]}
          type="date"
          placeholder="choose a date"
          value={reviewDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setReviewDate(e.target.value)}
        /> */}
        <input
          className={classes["description"]}
          type="text"
          placeholder="enter your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className={classes["add-btn"]} type="submit">
          Add Review
        </button>
      </form>
    </>
  );
};

export default AddReview;
