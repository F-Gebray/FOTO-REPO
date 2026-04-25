import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { mockHotels } from "../lib/mockData";
import { useDispatch } from "react-redux";
import { setBookingDetails } from "../store/bookingSlice";

import { Star, MapPin, Check, Wifi, Users, ChevronLeft } from "lucide-react";

import { Button } from "../components/ui/Button";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function HotelDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotel = mockHotels.find((h) => h.id === id);
  const dispatch = useDispatch();

  const [selectedRoom, setSelectedRoom] = useState(
    hotel?.roomTypes[0]?.id || "",
  );
  const [guests, setGuests] = useState(2);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [errors, setErrors] = useState<any>({});

  if (!hotel) {
    return <div className="p-20 text-center text-xl">Hotel not found.</div>;
  }

  // ================= PRICE =================
  const selectedRoomData = hotel.roomTypes.find((r) => r.id === selectedRoom);

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const roomPrice = selectedRoomData?.price || hotel.pricePerNight;
  const totalPrice = nights > 0 ? nights * roomPrice : roomPrice;

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors: any = {};

    if (!checkIn) newErrors.checkIn = "Select check-in date";
    if (!checkOut) newErrors.checkOut = "Select check-out date";

    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      newErrors.checkOut = "Check-out must be after check-in";
    }

    if (!guests || guests < 1) newErrors.guests = "Minimum 1 guest required";
    if (!selectedRoom) newErrors.room = "Select a room";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= BOOK =================
  const handleBookNow = () => {
    if (!validate()) return;

    dispatch(
      setBookingDetails({
        hotelId: hotel.id,
        roomType: selectedRoom,
        guests,
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
        price: totalPrice,
      }),
    );

    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/* BACK */}
      <Link
        to="/search"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to search results
      </Link>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{hotel.name}</h1>

          <div className="flex items-center gap-4 text-muted-foreground">
            {/* LOCATION */}
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {hotel.location}
            </span>

            {/* RATING */}
            <span className="flex items-center gap-1 text-yellow-500 font-medium bg-yellow-500/10 px-2 py-0.5 rounded text-sm">
              <Star className="h-4 w-4 fill-yellow-500" />
              {hotel.rating} ({hotel.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-3xl font-bold">${hotel.pricePerNight}</span>
          <span className="text-muted-foreground text-sm">per night</span>
        </div>
      </div>

      {/* IMAGE */}
      <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12">
        <img src={hotel.image} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT */}
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About this property</h2>
            <p className="text-muted-foreground text-lg">{hotel.description}</p>
          </section>

          {/* AMENITIES */}
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Popular Amenities</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ROOMS */}
          <section className="mb-12 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Room Options</h2>

            <div className="flex flex-col gap-4">
              {hotel.roomTypes.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-6 rounded-2xl border-2 cursor-pointer ${
                    selectedRoom === room.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{room.name}</h3>
                    <span className="font-semibold">${room.price}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Up to {room.capacity} guests
                    </span>

                    <span className="flex items-center gap-1">
                      <Wifi className="h-4 w-4" />
                      Free WiFi
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[400px]">
          <div className="border rounded-2xl p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Book your stay</h3>

            {/* CHECK-IN */}
            <DatePicker
              selected={checkIn ? new Date(checkIn) : null}
              onChange={(date: Date | null) =>
                setCheckIn(date ? format(date, "yyyy-MM-dd") : "")
              }
              placeholderText="Check-in date"
              className="w-full border p-2 rounded mb-1"
            />
            {errors.checkIn && (
              <p className="text-red-500 text-sm">{errors.checkIn}</p>
            )}

            {/* CHECK-OUT */}
            <DatePicker
              selected={checkOut ? new Date(checkOut) : null}
              onChange={(date: Date | null) =>
                setCheckOut(date ? format(date, "yyyy-MM-dd") : "")
              }
              placeholderText="Check-out date"
              minDate={checkIn ? new Date(checkIn) : new Date()}
              className="w-full border p-2 rounded mt-3 mb-1"
            />
            {errors.checkOut && (
              <p className="text-red-500 text-sm">{errors.checkOut}</p>
            )}

            {/* GUESTS */}
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border p-2 rounded mt-3"
            />

            {/* PRICE */}
            <div className="border-t mt-4 pt-4 text-sm">
              <div className="flex justify-between">
                <span>Price/night</span>
                <span>${roomPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Nights</span>
                <span>{nights}</span>
              </div>

              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <Button onClick={handleBookNow} className="w-full mt-4">
              Reserve Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
