import React from 'react'
import { SearchParamsProps } from '@/types'
import { getUserAnswer } from '@/lib/actions/user.action';
import AnswerCard from '@/components/cards/AnswerCard/AnswerCard';

interface Props extends SearchParamsProps {
    userId:string;
    clerkId?:string|null;
}
const AnswerTab =async ({searchParams, userId ,clerkId}:Props) => {
const result=await getUserAnswer({userId,page:1})
  return (
    <>
    {result.questions.map((item)=>(
        <AnswerCard  key={item.id} clerkId={clerkId} _id={item.id} question={item.question} author={item.author} upvotes={item.upvotes.length} createdAt={item.createdAt}/>
    ))}</>
  )
}

export default AnswerTab