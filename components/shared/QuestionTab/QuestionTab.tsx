import QuestionCard from '@/components/cards/QuestionCard/QuestionCard';
import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import Pagination from '../Pagination/Pagination';

interface Props extends SearchParamsProps {
    userId:string;
    clerkId?:string|null;
}
const QuestionTab =async ({searchParams,userId,clerkId}:Props) => {
const result =await getUserQuestions({userId,page:searchParams.page?+searchParams.page:1})
  return (
    <>
{result.questions.map((question)=>(

    <QuestionCard  
    key={question._id} _id={question._id} title={question.title} tags={question.tags} author={question.author} upvotes={question.upvotes} views={question.views} answers={question.answers} createdAt={question.createdAt}
    clerkId={clerkId}
    />
))}


<div className='mt-10'>

<Pagination pageNumber={searchParams?.page?+searchParams.page:1} isNext={result.isNextQuestions} />

</div>

    </>
  )
}

export default QuestionTab