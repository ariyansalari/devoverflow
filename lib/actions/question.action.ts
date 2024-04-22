'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from ".."
import Tag from "@/database/tag.model";
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";

export async function getQuestion(params:GetQuestionsParams) {
    try{
connectToDatabase()
const questions=await Question.find({}).populate({path:"tags",model:Tag}).populate({path:"author",model:User})

return {questions}
    }catch(error){
        console.log(error);
        throw error
    }
}
export async function createQuestion(params:CreateQuestionParams) {
    try{
        connectToDatabase() 
    const {title,content,tags,author,path}=params;

    // create the question
    const question =await Question.create({
        title,
        content,
        author,

    })

    const tagDocuments=[]
    for (const tag of tags){
        const exitstingTag=await Tag.findOneAndUpdate({
            name:{$regex:new RegExp(`^${tag}$`,"i")}
        },{
            $setOnInsert :{name:tag},$push:{questions:question._id}
        },{upsert:true,new:true})
        tagDocuments.push(exitstingTag._id)
    }
    await Question.findByIdAndUpdate(question._id,{
        $push :{tags:{$each:tagDocuments}}
    })
    // create an interaction record for the user's ask_question action 
    revalidatePath(path)
    }
    catch (error){

    }
    
}

export async function getQuestionById(params:GetQuestionByIdParams) {
    try{
connectToDatabase()
const {questionId}=params;

const question =await Question.findById(questionId).populate({path:"tags",model:Tag,select:"_id name"}).populate({path:"author",model:User,select:"_id clerkId name picture"})

return question
    }

    catch (error){
        console.log(error);
        throw error
    }
}

export const upvoteQuestion = async (params: QuestionVoteParams) => {
    try {
      connectToDatabase();
  
      const { questionId, hasdownVoted, hasupVoted, userId, path } = params;
  
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
      const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
        new: true,
      });
  
      if (!question) {
        throw new Error("Question not found");
      }
  
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const downvoteQuestion = async (params: QuestionVoteParams) => {
    try {
      connectToDatabase();
  
      const { questionId, hasdownVoted, hasupVoted, userId, path } = params;
  
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
      const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
        new: true,
      });
  
      if (!question) {
        throw new Error("Question not found");
      }
  
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteQuestionAction=async(params:DeleteQuestionParams)=>{
    try {
connectToDatabase()
const {path,questionId}=params
await Question.deleteOne({_id:questionId})
await Answer.deleteMany({question:questionId});
await Interaction.deleteMany({question:questionId});
await Tag.updateMany({question:questionId},{$pull:{questions:questionId}});
revalidatePath(path)
    }catch (error){
      console.log(error);
      throw error
      
    }
  }

  export const editQuestion=async(params:EditQuestionParams)=>{
    try {
connectToDatabase()
const {path,questionId,content,title}=params;
const question=await Question.findById(questionId).populate('tags');

if(!question){
  throw new Error('Question not found')
}
question.title=title;
question.content=content;

await question.save() 
revalidatePath(path)
    }catch (error){
      console.log(error);
      throw error
      
    }
  }