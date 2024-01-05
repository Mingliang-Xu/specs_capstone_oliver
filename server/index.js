require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { PORT } = process.env;
const { sequelize } = require("./util/database");

const { User } = require("./models/user");
const { Booking } = require("./models/booking");
const { Review } = require("./models/review");

const { register, login } = require("./controller/authController");
const {
  addBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getCheckOut,
  getCheckOutSuccess,
} = require("./controller/bookingController");

const {
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getPublishedReviews,
} = require("./controller/reviewController");

app.post("/api/register", register);
app.post("/api/login", login);

app.post("/api/booking", addBooking);
app.get("/api/bookings/:userId", getAllBookings);
app.put("/api/booking", updateBooking);
app.delete("/api/booking/:bookingId", deleteBooking);

app.get("/api/checkout/:bookingId", getCheckOut);
app.post("/api/create-checkout-session", getCheckOutSuccess);

app.post("/api/review", addReview);
app.get("/api/reviews/:userId", getAllReviews);
app.put("/api/review", updateReview);
app.delete("/api/review/:reviewId", deleteReview);

app.get("/api/reviews", getPublishedReviews);

User.hasMany(Booking);
Booking.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User);
Booking.hasOne(Review);
Review.belongsTo(Booking);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => app.listen(PORT, console.log(`Server running on ${PORT}`)))
  .catch((err) => console.log(err));
