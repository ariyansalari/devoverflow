'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params:ViewQuestionParams) {
    try {
await connectToDatabase()
const {questionId,userId}=params
await Question.findByIdAndUpdate(questionId,{$inc:{views:1}})
if(userId){
    const exitstingInteraction=await Interaction.findOne({
        user:userId,
        action:"view",
        question:questionId
    })

    if(exitstingInteraction) return console.log('User already virewed.');

    await Interaction.create({
        user:userId,
        action:"view",
        question:questionId

    })
    
}
    }
    catch(error){
        console.log(error);
        throw error;
        
    }
}


