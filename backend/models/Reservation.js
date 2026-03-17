const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  listingId: Number,
  listingName: String,
  guestName: String,
  guestEmail: String,
  checkIn: Date,
  checkOut: Date,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
