'use server'

import User from "@/database/user.model";
import { connectToDatabase } from "..";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";


export async function getTopInteractedTags(params:GetTopInteractedTagsParams) {
    try{
connectToDatabase()
const {userId}=params

const user =await User.findById(userId)
if(!user) throw new Error('User not found')

// Find interaction for the user and group by tags...
// interaction...

return [{_id:1,name:"tag1"},{_id:1,name:"tag2"},{_id:1,name:"tag3"}]
    }
    catch(error){
console.log(error);
throw error

    }
  }

  export async function getAllTags(params:GetAllTagsParams) {
    try{
connectToDatabase()
const {filter,searchQuery,page=1,pageSize=2}=params
const skipAmount = (page - 1) * pageSize;
const query:FilterQuery<typeof Tag> ={}
if(searchQuery){
  query.$or=[{name:{$regex:new RegExp(searchQuery,'i')}}]
}
let sortOption = {};

  switch (filter) {
    case "popular":
      sortOption = { questions: -1 };
      break;
    case "recent":
      sortOption = { createdAt: -1 };
      break;
    case "name":
      sortOption = { name: 1 };
      break;
    case "old":
      sortOption = { createdAt: 1 };
      break;

    default:
      break;
  }
  const totalTags=await Tag.countDocuments(query)
const tags=await Tag.find(query).sort(sortOption).skip(skipAmount).limit(pageSize)
const isNext=totalTags>skipAmount+tags.length
    return{tags,isNext}
    }
    catch(error){
console.log(error);
throw error

    }
  }

  export const getQuestionByTagId = async (params: GetQuestionsByTagIdParams) => {
    try {
      connectToDatabase();
  
      const { tagId, searchQuery, page = 1, pageSize = 10 } = params;
      const skipAmount = (page - 1) * pageSize;
console.log(page);
console.log(skipAmount);

      const tagFilter: FilterQuery<ITag> = { _id: tagId };
  
  
     
      const tag = await Tag.findOne(tagFilter).populate({
        path: "questions",
        model: Question,
        match:searchQuery?{title:{$regex:searchQuery,$options:'i'}}:{},
        options: {
          sort: { createdAt: -1 },
          skip: skipAmount,
          limit: pageSize+1 ,
        },
        populate: [
          { path: "tags", model: "Tag", select: "_id name" },
          { path: "author", model: "User", select: "_id clerkId name picture" },
        ],
      });
      if (!tag) {
        throw new Error("Tag not found");
      }
  
      const isNext = tag.questions.length > skipAmount+pageSize;
      console.log(isNext);
      console.log(tag.questions.length);
      console.log(pageSize);
      
      const questions = tag.questions;
  
      return { tagTitle: tag.name, questions, isNext };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  