import { isDateBetween, replaceMongoIdInArray, replaceMongoIdInObject } from "@/_utils/data-utils";

import { amenityModel } from "../amenity-model";
import { bookingModel } from "../booking-model";
import { hotelModel } from "../hotel-model";
import { ratingModel } from "../rating-model";
import { reviewModel } from "../review-model";
import { userModel } from "../user-model";

export async function getAllHotels(destination, checkin, checkout, category, amenities) {
   const regex = new RegExp(destination, "i");

   const hotelsByDestination = await hotelModel.find({city: {$regex: regex}}).select(["name", "city", "highRate", "lowRate", "propertyCategory", "thumbNailUrl", "amenities" ]).populate({
      path: "amenities",
      model: amenityModel
   }).lean();

   let allHotels = hotelsByDestination;
   // console.log('hotel', allHotels);

   if(checkin && checkout) {
      allHotels = await Promise.all(
         allHotels.map( async(hotel) => {
            // console.log('hotel', hotel);
            const found = await findBooking(hotel._id, checkin, checkout);
            // console.log('found', found);

            if(found) {
               hotel['isBooked'] = true;
            } else {
               hotel['isBooked'] = false;
            }
            return hotel;
         })
      );
   }
   // console.log('category', category);
   //filter  hotels by category params
   if(category) {
      allHotels = allHotels.filter(hotel => {
         return category?.includes(hotel.propertyCategory.toString());
      })
   }

   // filter hotels by amenities
   // amenities array string variable
   if(amenities) {
      // console.log(amenities);
      allHotels = allHotels?.filter(hotel => {
         // console.log(hotel);
         const ameHotel=  hotel?.amenities?.some(amenity =>{ 
            return amenities.includes(amenity.slug)
         })
         // console.log(ameHotel);
         return ameHotel;
         })
   }

   return replaceMongoIdInArray(allHotels);
}

async function findBooking(hotelId, checkin, checkout) {
   const matches = await bookingModel.find({hotelId: hotelId.toString()}).lean();
   // console.log('match', matches);
   const found = matches.find((match) => {
      return (
         isDateBetween(checkin, match.checkin, match.checkout) ||
         isDateBetween(checkout, match.checkin, match.checkout)
      )
   })

   return found;
}

export async function getRatingForAHotel(hotelId) {
   const ratings = await ratingModel.find({hotelId: hotelId}).lean();

   return replaceMongoIdInArray(ratings);
}

export async function getReviewsForAHotel(hotelId) {
   const reviews = await reviewModel.find({hotelId: hotelId}).lean();

   return replaceMongoIdInArray(reviews);
}


export async function getHotelById(hotelId, checkin, checkout) {
    const hotel = await hotelModel.findById(hotelId).lean();

    if(checkin && checkout) {
         const found = await findBooking(hotelId, checkin, checkout);

         if(found) {
            hotel['isBooked'] = true;
         } else {
            hotel['isBooked'] = false;
         }
    }

   return replaceMongoIdInObject(hotel);
}

export async function getUserByEmail(email) {
   const user = await userModel.find({email: email}).lean();

   return replaceMongoIdInObject(user[0]);
}

export async function getBookingByUserId(id) {
   const booking = await bookingModel.find({userId: id}).lean();

   return replaceMongoIdInArray(booking);
}