import mongoose, { Schema } from "mongoose";

const amenitySchema = new Schema({
  name: {
    required: true,
    type: String
  },
   url: {
    required: true,
    type: String
  },
  price: {
    required: false,
    type: String
  },
  instructions: {
    required: false,
    type: String
  },
  hours: {
   required: false,
   type: String
  }
});


export const amenityModel = mongoose.models.amenity ?? mongoose.model("amenity", amenitySchema);
