"use server"

import { signIn } from "@/auth";

export const login = async (formdata) => {
   try {
      const response = await signIn('credentials', {
         email: formdata.get('email'),
         password: formdata.get('password'),
         redirect: false,
      })
      // console.log('login response', response);
      return response;

   } catch (error) {
      throw new Error(error)
   }
} 