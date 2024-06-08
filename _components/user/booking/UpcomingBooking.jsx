import BookingList from "./BookingList"

const UpcomingBooking = ({ bookings }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">⌛️ Upcomming Bookings</h2>

      <div className="bg-[#F6F3E9] p-4 rounded-md">
        {bookings.length > 0 ? (
          <BookingList bookings={bookings} />
        ) : (<p>You have no upcoming bookings.</p>)}
      </div>
    </div>
  )
}

export default UpcomingBooking
