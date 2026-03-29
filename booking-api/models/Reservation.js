const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  listingId: String,
  listingName: String,
  checkIn: Date,
  totalPrice: Number,
  userId: String,
  guestName: String,
  guestEmail: String,
});

module.exports = mongoose.model("Reservation", ReservationSchema);
