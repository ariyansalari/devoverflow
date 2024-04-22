import QuestionCard from '@/components/cards/QuestionCard/QuestionCard'
import HomeFilters from '@/components/home/HomeFilters/HomeFilters'
import NoResult from '@/components/shared/NoResult/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { IQuestion } from '@/database/question.model'
import { getQuestionByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const Page =async ({params,searchParams }:URLProps) => {
    const result =await getQuestionByTagId({
        tagId:params.id,
        page:1,
        searchQuery:searchParams.q
    })
    
  return (
    <>
    <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'> 
     <h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>
     <Link href={'/ask-question'} className='flex justify-end max-sm:w-full'>
     <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>Ask a Question</Button>
     </Link>
    </div>
    <div className='mt-11'>
   <LocalSearchBar route='/' iconPosition='left' imgSrc='/assets/icons/search.svg' otherClasses="flex-1" placeholder={'search for tag questions'}/>
    </div>
    <HomeFilters />
    <div className='mt-10 flex w-full flex-col gap-6'>
     {result.questions?.length >0? result.questions.map((question:IQuestion)=>(
     <QuestionCard key={question._id} _id={question._id} title={question.title} tags={question.tags} author={question.author} upvotes={question.upvotes} views={question.views} answers={question.answers} createdAt={question.createdAt}/>
     )):<NoResult
     title={"There's no tag question saved to show"}
     desc={"Be the first to break the silence! 🐱‍👤 Ask a Que  stion and kickstart the discussion. our queery could be the next big thing others learn from. Get involved! ⚡"}
     link="/ask-question"
     linkTitle="Ask a Question"
     />}
    </div>
    </>
   
  )
}

export default Page