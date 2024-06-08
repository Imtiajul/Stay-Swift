import BookingList from "./BookingList"

const PastBooking = ({ bookings }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🕛️ Past Bookings</h2>

      <div className="bg-[#ebf6e9] p-4 rounded-md">
        {bookings.length > 0 ? (
          <BookingList bookings={bookings} />
        ) : (
          <p>You have no Past bookings.</p>
        )}
      </div>
    </div>
  )
}

export default PastBooking
