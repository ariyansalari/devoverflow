'use server'
import User from "@/database/user.model"
import { connectToDatabase } from ".."
import { GetUserByIdParams } from "./shared.types";

 

export const getUserById = async (params: GetUserByIdParams) => {
    try {
      connectToDatabase();
  
      const { userId } = params;
  
      const user = await User.findOne({ clerkId: userId });
  
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };