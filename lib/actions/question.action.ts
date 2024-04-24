'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from ".."
import Tag from "@/database/tag.model";
import { CreateQuestionParams, DeleteQuestionParams, EditQuestionParams, GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestion(params:GetQuestionsParams) {
    try{
connectToDatabase()
const {searchQuery,page=1,pageSize=10,filter}=params
// calculate the number of posts to skip based on the page number

const query:FilterQuery<typeof Question>={}
if(searchQuery){
  query.$or=[{title:{$regex:new RegExp(searchQuery,'i')}},{content:{$regex:new RegExp(searchQuery,'i')}}]
}
let sortOption = {};

  switch (filter) {
    case "newest":
      sortOption = { createdAt: -1 };
      break;
    case "frequent":
      sortOption = { views: -1 };
      break;
   
      case "unanswered":
        query.answers = { $size: 0 };
      break;

    default:
      break;
  }
const skipAmount=(page-1) * pageSize

const questions=await Question.find(query).populate({path:"tags",model:Tag}).populate({path:"author",model:User}).skip(skipAmount).limit(pageSize).sort(sortOption)
const totalQuestions=await Question.countDocuments(query);
const isNext=totalQuestions>skipAmount+questions.length 


return {questions,isNext}
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

    await Interaction.create({
      user:author,
      action:"ask-question",
      question:question._id,
      tags:tagDocuments
    })

    // increment author's reputation by +5 for creating  a question
    await User.findByIdAndUpdate(author,{$inc:{reputation:5}})
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
  // increment +1 -1 for user
  await User.findByIdAndUpdate(userId,{$inc:{reputation:hasdownVoted?-1:1}})
  // increment author's reputation by +10 -10 for  recieving an upvote/downvote to the question
  await User.findByIdAndUpdate(question.author,{$inc:{reputation:hasupVoted?-10:10}})
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
  
      await User.findByIdAndUpdate(userId,{$inc:{reputation:hasdownVoted?1:-1}})
      // increment author's reputation by +10 -10 for  recieving an upvote/downvote to the question
      await User.findByIdAndUpdate(question.author,{$inc:{reputation:hasdownVoted?10:-10}})
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


  export const getHotQuestion=async()=>{
    try {
connectToDatabase()
const hotQuestion=await Question.find({}).sort({views:-1,upvotes:-1}).limit(5) // decending 
return hotQuestion
    }catch (error){
      console.log(error);
      throw error
      
    }
  }

  export const getTopPopularTag=async()=>{
    try {
connectToDatabase()
const popularTags=await Tag.aggregate([
  {
  $project:{name:1,numberOfQuestions:{$size:"$questions"}}},
  {$sort:{numberOfQuestions:-1}},
  {$limit:5}
])// decending
return popularTags; 
    }catch (error){
      console.log(error);
      throw error
      
    }
  }