import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookingDetails {
  hotelId: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  roomType: string;
  price: number;
}

interface BookingState {
  currentBooking: BookingDetails;
  favorites: string[];
}

const initialState: BookingState = {
  currentBooking: {
    hotelId: "",
    checkIn: null,
    checkOut: null,
    guests: 2,
    roomType: "standard",
    price: 0,
  },
  favorites: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (
      state,
      action: PayloadAction<Partial<BookingDetails>>,
    ) => {
      state.currentBooking = { ...state.currentBooking, ...action.payload };
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      } else {
        state.favorites.push(action.payload);
      }
    },
    clearBooking: (state) => {
      state.currentBooking = initialState.currentBooking;
    },
  },
});

export const { setBookingDetails, toggleFavorite, clearBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
