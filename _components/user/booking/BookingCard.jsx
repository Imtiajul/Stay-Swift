import { getHotelById } from "@/_models/queries"
import { getDayDifference } from "@/_utils/data-utils"
import Link from "next/link"

const BookingCard = async ({ hotelId, checkin, checkout }) => {
  const hotelInfo = await getHotelById(hotelId)

  const days = getDayDifference(checkin, checkout)
  const perNightCost = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2
  const totalCost = perNightCost * days

  return (
    <div className="flex justify-between items-center ">
      <div>
        <h3 className="text-xl font-semibold"><Link href={`/hotels/${hotelId}`}>{hotelInfo?.name}</Link></h3>
        <div className="text-sm text-gray-600 my-4">
          <p>Check In: {checkin}</p>
          <p>Check Out: {checkout}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-right">${totalCost}</h3>
        <p className="text-sm text-gray-600">
          ${perNightCost} per night x {days} days
        </p>
      </div>
    </div>
  )
}

export default BookingCard
