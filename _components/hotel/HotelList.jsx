import { getAllHotels } from "@/_models/queries"
import HotelCard from "./HotelCard"
import NoHotels from "./NoHotels"

const HotelList = async ({destination, checkin, checkout, category, amenities, sortBy, priceRange }) => {
  const hotelList = await getAllHotels(destination, checkin, checkout, category, amenities, sortBy, priceRange)
  // console.log(hotelList);
  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {hotelList.length > 0 ? (
          hotelList?.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotelInfo={hotel}
              checkin={checkin}
              checkout={checkout}
            />
          ))
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  )
}

export default HotelList
