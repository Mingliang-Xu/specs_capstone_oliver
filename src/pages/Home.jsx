import React from "react";

import { useLoaderData } from "react-router-dom";

import classes from "./Home.module.css";

const Home = () => {
  const allPublishedReviews = useLoaderData();

  console.log(" rendering home...............");

  return (
    <main className={classes["review-container"]}>
      {allPublishedReviews.map((review) => (
        <div key={review.id}>
          <p>{review.description}</p>
          <h3>
            {new Date(
              new Date(Date.parse(review.createdAt)).getTime() +
                new Date(Date.parse(review.createdAt)).getTimezoneOffset() *
                  60000
            ).toDateString()}
          </h3>
        </div>
      ))}
    </main>
  );
};

export default Home;
