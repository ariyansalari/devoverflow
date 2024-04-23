'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "..";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";


const SearchableTypes=['question','answer','']
export async function globalSearch(params:SearchParams) {
    try {
connectToDatabase()

        const {type,query}=params;
        const regexQuery={$regex:query,$options:'i'};

        let results:string[] =[]

        const modelAndTypes=[
            {model:Question,searchField:"title",type:"question"},
            {model:User,searchField:"name",type:"user"},
            {model:Answer,searchField:"content",type:"answer"},
            {model:Tag,searchField:"name",type:"tag"},

        ]

        const typeLower=type?.toLocaleLowerCase();
        if(!typeLower || !SearchableTypes.includes(typeLower)){
// Search Acroos everything
for(const {model,searchField,type}of modelAndTypes){
    const queryResults=await model.find({[searchField]:regexQuery}).limit(2)

    results.push(...queryResults.map((item)=>({
        title:type==='answer'?`Answers containing ${query}`:item[searchField],
        type,
        id:type==='user'?item.clerkId:type==='answer'?item.question:item._id
     } )))
}


        }else {
            // search in the specified model type
            const modelInfo=modelAndTypes.find((item)=>item.type===type)
            
            if(!modelInfo){
                throw new Error('invalid search type')

            }
            const queryResults=await modelInfo.model.find({[modelInfo.searchField]:regexQuery}).limit(8)
            results=queryResults.map((item)=>({
                title:type==='answer'?`Answers containing ${query}`:item[modelInfo.searchField],
                type,
                id:type==='user'?item.clerkId:type==='answer'?item.question:item._id
            }))
        }
return JSON.stringify(results)
    }catch(error){
        console.log(`Error fetching global results , ${error}`);
        throw error
        
    }
    
}