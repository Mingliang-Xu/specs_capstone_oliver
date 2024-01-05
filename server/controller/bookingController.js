const { Booking } = require("../models/booking");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

module.exports = {
  addBooking: async (req, res) => {
    try {
      const { bookingTime, bookingDate, numberOfPeople, email, userId } =
        req.body;
      const newBooking = await Booking.create({
        bookingTime,
        bookingDate,
        numberOfPeople,
        email,
        userId,
      });
      // .then((result) => result)
      // .catch((err) => console.log(err));
      res.status(200).send("adding new booking works");
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong adding a booking");
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const { userId } = req.params;
      const allBookings = await Booking.findAll({ where: { userId: userId } })
        .then((result) => result)
        .catch((err) => console.log(err));
      res.status(200).send(allBookings);
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong getting all bookings");
    }
  },
  updateBooking: async (req, res) => {
    try {
      const { bookingTime, bookingDate, numberOfPeople, email, bookingId } =
        req.body;
      await Booking.update(
        { bookingTime, bookingDate, numberOfPeople, email },
        { where: { id: +bookingId } }
      );
      // .then((result) => console.log(result))
      // .catch((err) => console.log(err));
      res.status(200).send("update booking worked");
    } catch (error) {
      console.log(error);
    }
  },
  getCheckOut: async (req, res) => {
    try {
      const { bookingId } = req.params;
      const checkOutBooking = await Booking.findByPk(+bookingId);

      // .then((result) => result.numberOfPeople)
      // .catch((err) => console.log(err));

      res.status(200).send(checkOutBooking);
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong with checkout");
    }
  },
  getCheckOutSuccess: async (req, res) => {
    try {
      const { items } = req.body;
      // console.log(items, "-------------------------");

      const selectedBooking = await Booking.findByPk(items[0].id);
      console.log(selectedBooking);
      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Chocolate Cookie Baking Experience`,
            },
            unit_amount: 7500,
          },
          quantity: selectedBooking.numberOfPeople,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems, // returns an array
        success_url: `${process.env.SERVER_URL}/home`,
        cancel_url: `${process.env.SERVER_URL}/home`,
      });
      res.status(200).json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const { bookingId } = req.params;
      await Booking.destroy({ where: { id: bookingId } });
      // .then((result) => result)
      // .catch((err) => console.log(err));
      res.status(200).send("delete bookings worked");
    } catch (error) {
      console.log(error);
    }
  },
};
