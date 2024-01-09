const { Review } = require("../models/review");

const { User } = require("../models/user");
module.exports = {
  addReview: async (req, res) => {
    try {
      const { reviewDate, description, userId } = req.body;
      const newReview = await Review.create({
        reviewDate,
        description,
        userId,
        publish: false,
      })
        .then((result) => result)
        .catch((err) => console.log(err));
      res.status(200).send("adding new review works");
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong adding a review");
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const { userId } = req.params;
      const allReviews = await Review.findAll({
        where: { userId: userId },
        order: [["id", "DESC"]],
      })
        .then((result) => result)
        .catch((err) => console.log(err));
      res.status(200).send(allReviews);
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong getting all reviews");
    }
  },
  updateReview: async (req, res) => {
    try {
      const { reviewDate, description, reviewId, publish } = req.body;
      await Review.update(
        { reviewDate, description, publish },
        { where: { id: +reviewId } }
      )
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      res.status(200).send("update review worked");
    } catch (error) {
      console.log(error);
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      await Review.destroy({ where: { id: reviewId } })
        .then((result) => result)
        .catch((err) => console.log(err));
      res.status(200).send("delete reviews worked");
    } catch (error) {
      console.log(error);
    }
  },
  getPublishedReviews: async (req, res) => {
    try {
      const PublishedReviews = await Review.findAll({
        where: {
          publish: true,
        },
        include: {
          model: User,
          // through: {
          //   attributes: ["userId"],
          // },
        },
        order: [["id", "DESC"]],
      })
        .then((result) => result)
        .catch((err) => console.log(err));
      res.status(200).send(PublishedReviews);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("something went wrong getting all published reviews");
    }
  },
};
