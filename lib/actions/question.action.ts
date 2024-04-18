'use server'

import { connectToDatabase } from ".."


export async function createQuestion(params:any) {
    try{
        connectToDatabase()    }
    catch (error){

    }
    
}