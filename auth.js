import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials" 
import clientPromise from "./_database/mongoClientPromise"
import { userModel } from "./_models/user-model"
import { dbConnect } from "./_services/mongoConnection"
import bcrypt from "bcryptjs"

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
   adapter: MongoDBAdapter(clientPromise, {databaseName: process.env.DB_NAME}),
   session: {
      strategy: "jwt",
      maxAge: 3600 * 24 * 7,
   },

   providers: [
      CredentialProvider({
         credentials: {
            email: {},
            password: {},
         },
         async authorize(credentials) {
            if(credentials === null ) return null;
            await dbConnect();

            try {
               const user = await userModel.findOne({email: credentials.email});

               if(user) {
                  const isMatch = await bcrypt.compare(
                     credentials.password,
                     user.password
                  )
                  // console.log(isMatch);
                  if(isMatch) {
                     return user;
                  } else {
                     throw new Error("Email or password not correct");
                  }

               } else {
                  throw new Error("User not found")
               }
            } catch (error) {
               throw new Error(error.message);
            }
         }
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
   ]
})