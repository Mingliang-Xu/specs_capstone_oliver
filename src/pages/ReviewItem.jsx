import React, { useState } from "react";
import axios from "axios";

import classes from "./ReviewItem.module.css";

const ReviewItem = ({ review, fetchAllReviews }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [reviewDate, setReviewDate] = useState(review.reviewDate);
  const [description, setDescription] = useState(review.description);
  // const [publish, setPublish] = useState(review.publish);

  const handleChanges = (e) => {
    e.preventDefault();

    axios
      .put("/api/review", {
        reviewDate,
        description,
        reviewId: review.id,
        publish: false,
      })
      .then((res) => {
        fetchAllReviews();
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios
      .delete(`/api/review/${review.id}`)
      .then((res) => {
        console.log(res);
        fetchAllReviews();
      })
      .catch((err) => console.log(err));
  };

  const officialDate = Date.parse(review.createdAt);
  const stringDate = new Date(officialDate);
  const dispalyReviewDate = new Date(
    stringDate.getTime() + stringDate.getTimezoneOffset() * 60000
  );

  const handlChangePublish = (e) => {
    axios
      .put("/api/review", {
        reviewDate,
        description,
        reviewId: review.id,
        publish: !review.publish,
      })
      .then((res) => {
        fetchAllReviews();
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isEditing ? (
        <div className={classes["review-card"]}>
          <form onSubmit={(e) => handleChanges(e)}>
            {/* <input
              type="date"
              value={reviewDate.slice(0, 10)}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setReviewDate(e.target.value)}
            /> */}
            <input
              type="text"
              placeholder="enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
          <button
            type="submit"
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className={classes["review-card"]}>
          <span>
            <button
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          </span>

          <h2>{dispalyReviewDate.toDateString()}</h2>
          <h3>{review.description}</h3>
          <button onClick={() => handlChangePublish()}>
            {review.publish ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}
    </>
  );
};

export default ReviewItem;
