import { bookingModel } from "@/_models/booking-model";
import { dbConnect } from "@/_services/mongoConnection";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";


export const POST = async (request) => {

   const { hotelId, userId, checkin, checkout} = await request.json();
   const payload = {
      hotelId: new mongoose.Types.ObjectId(hotelId),
      userId: new mongoose.Types.ObjectId(userId),
      checkin, 
      checkout,
   }
   
   try {
      await dbConnect();
      await bookingModel.create(payload);

      return new NextResponse("A New Booking has been made", {
         status: 201,
      });
   
   } catch (error) {
      return new NextResponse(error.message, {
         status: 500
      });
   }
}