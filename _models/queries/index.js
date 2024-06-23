import { isDateBetween, replaceMongoIdInArray, replaceMongoIdInObject } from "@/_utils/data-utils";

import { amenityModel } from "../amenity-model";
import { bookingModel } from "../booking-model";
import { hotelModel } from "../hotel-model";
import { ratingModel } from "../rating-model";
import { reviewModel } from "../review-model";
import { userModel } from "../user-model";

export async function getAllHotels(destination, checkin, checkout, category, amenities, sortBy, priceRange) {
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

   if(priceRange) {
         if(priceRange.includes("1")) {
           allHotels = filterPriceRange(allHotels, 250, 350);
         } 
         if(priceRange.includes("2")) {
            allHotels = filterPriceRange(allHotels, 350, 450);
         } 
         if(priceRange.includes("3")) {
            allHotels = filterPriceRange(allHotels, 450, 550);
         } 
         if(priceRange.includes("4")) {
            allHotels = filterPriceRange(allHotels, 550, 650);
         } 
         if(priceRange.includes("5")) {
            allHotels = filterPriceRange(allHotels, 650, 750);
         } 
         if(priceRange.includes("6")) {
            allHotels = filterPriceRange(allHotels, 750);
         } 
   }

   if(sortBy) {
      if(sortBy === 'highToLow' ) {
         allHotels.sort((a, b) => {
      
            const aPrice = a.highRate + a.lowRate;
            const bPrice = b.highRate + b.lowRate; 
            if(bPrice < aPrice) { return -1; }   
         });
      }
         else if(sortBy === 'lowToHigh') {
         allHotels.sort((a, b) => {
      
            const aPrice = a.highRate + a.lowRate;
            const bPrice = b.highRate + b.lowRate; 
            if(aPrice < bPrice) { return -1; }
         })
      }
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

const filterPriceRange = (hotels, lowPrice, highPrice) => {
   
   return hotels?.filter(hotel => {
      const avgPrice = (hotel.highRate + hotel.lowRate)/2;
      //for filter the greatest price
      if(!highPrice) return avgPrice >= lowPrice;

      return avgPrice >= lowPrice && avgPrice <= highPrice;
   });

}