'use server'

import Answer from "@/database/answer.model";
import { connectToDatabase } from "..";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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
        const {questionId}=params
const answers=await Answer.find({question:questionId}).populate('author','_id clerkId name picture').sort({createdAt:-1})
return {answers}
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
 