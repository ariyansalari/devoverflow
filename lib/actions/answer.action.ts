'use server'

import Answer from "@/database/answer.model";
import { connectToDatabase } from "..";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params:CreateAnswerParams) {
    try{

        connectToDatabase()
        const {content,path,author,question}=params

const newAnswer=await Answer.create({
content,author,question
})
// Add the answer to the question's answers array

await Question.findByIdAndUpdate(question,{
    $push:{answers:newAnswer._id}
})

// TODO : add interaction...


revalidatePath(path)
    }catch(error){
        console.log(error);
        throw error
        
    }
}
export async function getAnswer(params:GetAnswersParams) {
    try{

        connectToDatabase()
        const {questionId,sortBy,page=1,pageSize=8}=params
const skipAmount=(page -1)*pageSize
        let sortOption = {};

  switch (sortBy) {
    case "highestUpvotes":
      sortOption = { upvotes: -1 };
      break;
    case "lowestUpvotes":
      sortOption = { upvotes: 1 };
      break;
    case "recent":
      sortOption = { createdAt: -1 };
      break;
    case "old":
      sortOption = { createdAt: 1 };
      break;

    default:
      break;
  }
const answers=await Answer.find({question:questionId}).skip(skipAmount).limit(pageSize).populate('author','_id clerkId name picture').sort(sortOption)
const totalAnswer=await Answer.countDocuments({question:questionId})
const isNextAnswer=totalAnswer>skipAmount+answers.length
return {answers,isNextAnswer}
    }catch(error){
        console.log(error);
        throw error
        
    }
}

export const downvoteAnswer = async (params: AnswerVoteParams) => {
    try {
      connectToDatabase();
  
      const { answerId, hasdownVoted, hasupVoted, userId, path } = params;
  
      let updateQuery = {};
      if (hasdownVoted) {
        updateQuery = { $pull: { downvotes: userId } };
      } else if (hasupVoted) {
        updateQuery = {
          $pull: { upvotes: userId },
          $push: { downvotes: userId },
        };
      } else {
        updateQuery = { $addToSet: { downvotes: userId } };
      }
      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
        new: true,
      });
  
      if (!answer) {
        throw new Error("Answer not found");
      }
  
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const upvoteAnswer = async (params: AnswerVoteParams) => {
    try {
      connectToDatabase();
  
      const { answerId, hasdownVoted, hasupVoted, userId, path } = params;
  
      let updateQuery = {};
      if (hasupVoted) {
        updateQuery = { $pull: { upvotes: userId } };
      } else if (hasdownVoted) {
        updateQuery = {
          $pull: { downvotes: userId },
          $push: { upvotes: userId },
        };
      } else {
        updateQuery = { $addToSet: { upvotes: userId } };
      }
      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
        new: true,
      });
  
      if (!answer) {
        throw new Error("Answer not found");
      }
  
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
 
  export const deleteAnswerAction=async(params:DeleteAnswerParams)=>{
    try {
connectToDatabase()
const {path,answerId}=params
const answer =await Answer.findById(answerId)
if(!answer){
  throw new Error('Answer not found')
}
await Answer.deleteOne({_id:answerId})
await Question.updateMany({_id:answer.question},{$pull:{answers:answerId}});

await Interaction.deleteMany({question:answerId});
revalidatePath(path)
    }catch (error){
      console.log(error);
      throw error
      
    }
  }