import React, { useState, useContext } from "react";
import ReviewItem from "./ReviewItem";

import AuthContext from "../store/AuthContext";
import AddReview from "../components/AddReview";

import axios from "axios";
import { useLoaderData } from "react-router-dom";

import classes from "./Review.module.css";

export const viewAllReviews = async () => {
  const userId = localStorage.getItem("userId");
  const response = await axios.get(`/api/reviews/${userId}`);
  return response.data;
};
const Review = () => {
  const { state } = useContext(AuthContext);
  const [allReviews, setAllReviews] = useState(useLoaderData());

  const fetchAllReviews = () => {
    axios
      .get(`/api/reviews/${state.userId}`)
      .then((res) => setAllReviews(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <main className={classes.layout}>
      {state.userId && <AddReview fetchAllReviews={fetchAllReviews} />}
      <div className={classes["review-container"]}>
        {state.userId &&
          allReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              fetchAllReviews={fetchAllReviews}
            />
          ))}
      </div>
    </main>
  );
};

export default Review;
