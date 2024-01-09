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
    const confirmed = window.confirm("Are you sure?");
    confirmed &&
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
            <textarea
              rows={10}
              cols={25}
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

          <p>{review.description}</p>
          <h3>{dispalyReviewDate.toDateString()}</h3>
          <button onClick={() => handlChangePublish()}>
            {review.publish ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}
    </>
  );
};

export default ReviewItem;
