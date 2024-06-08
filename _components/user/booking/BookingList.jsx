import BookingCard from "./BookingCard"

const BookingList = ({ bookings }) => {
  return bookings.map((booking) => (
    <BookingCard
      key={booking.id}
      hotelId={booking.hotelId}
      checkin={booking.checkin}
      checkout={booking.checkout}
    />
  ))
}

export default BookingList
