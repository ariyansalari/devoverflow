import Question from '@/components/forms/Question/Question'
import { getQuestionById } from '@/lib'
import { getUserById } from '@/lib/actions/user.action'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata ={
  title:"Edit Question | Dev Overflow",

}
const Page =async ({params}:ParamsProps) => {
  const {userId}=auth()
  if(!userId) return null;
  const mongoUser=await getUserById({userId})
  const result=await getQuestionById({questionId:params.id})
  
  return (
<>
<h1 className='h1-bold text-dark100_light900'>Edit Question</h1>

<div className='mt-9 '>
  <Question type="Edit" mongoUserId={mongoUser._id}  questionDetails={JSON.stringify(result)}/>
</div>
</>
  )
}

export default Page