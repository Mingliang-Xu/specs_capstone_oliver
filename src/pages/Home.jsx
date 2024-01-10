import React, { useEffect, useState } from "react";

// import { useLoaderData } from "react-router-dom";

import classes from "./Home.module.css";

import { viewAllPublishedReviews } from "../App";

const Home = () => {
  const [allPublishedReviews, setAllPublishedReviews] = useState([]);

  useEffect(() => {
    viewAllPublishedReviews().then((data) => {
      setAllPublishedReviews(data);
    });
  }, []);

  // const allPublishedReviews = useLoaderData();

  // console.log(" rendering home...............");
  // console.log(allPublishedReviews);

  return (
    <main className={classes["review-container"]}>
      {allPublishedReviews.map((review) => (
        <div key={review.id}>
          <h3>{`From ${review.user.username},`}</h3>
          <p>{review.description}</p>
          <h4>
            {new Date(
              new Date(Date.parse(review.createdAt)).getTime() +
                new Date(Date.parse(review.createdAt)).getTimezoneOffset() *
                  60000
            ).toDateString()}
          </h4>
        </div>
      ))}
    </main>
  );
};

export default Home;
