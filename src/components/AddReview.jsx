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
        <textarea
          className={classes["description"]}
          rows={20}
          cols={50}
          placeholder="enter your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className={classes["add-btn"]} type="submit">
          Post Review
        </button>
      </form>
    </>
  );
};

export default AddReview;
