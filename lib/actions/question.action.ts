'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from ".."
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

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
            $setOnInsert :{name:tag},$push:{question:question._id}
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