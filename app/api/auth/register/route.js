import { NextResponse, NextRequest } from "next/server";
import { userModel } from "@/_models/user-model";
import { dbConnect } from "@/_services/mongoConnection";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
   const {fname, lname, email, password } = await request.json();

   // console.log(fname, lname, email, password);

   const hasedPassword = await bcrypt.hash(password, 5);

   const newUser = {
      name: `${fname} ${lname}`,
      email,
      password: hasedPassword,
   }

   try {
      await dbConnect()
      await userModel.create(newUser);

      return new NextResponse("User has been created successfully", {
         status: 201,
      });
   } catch (error) {
      return new NextResponse(error.message, {
         status: 500,
      });
   }
}