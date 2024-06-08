import Gallery from "@/_components/hotel/details/Gallery"
import Overview from "@/_components/hotel/details/Overview"
import Summary from "@/_components/hotel/details/Summary"
import { getHotelById } from "@/_models/queries"

const HotelDetailsPage = async({params: {id}, searchParams:{checkin, checkout}}) => {
  const hotel = await getHotelById(id, checkin, checkout);

  return (
    <>
        <Summary hotelInfo={hotel} checkin={checkin} checkout={checkout}/>
        <Gallery gallery={hotel?.gallery} />
        <Overview overview={hotel.overview} />
    </>
  )
}

export default HotelDetailsPage