import QuestionCard from '@/components/cards/QuestionCard/QuestionCard'
import HomeFilters from '@/components/home/HomeFilters/HomeFilters'
import Filter from '@/components/shared/Filter/Filter'
import NoResult from '@/components/shared/NoResult/NoResult'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar/LocalSearchBar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  const questions = [
    {
        _id: "1",
        title: "Cascading Deletes in SQLAlchemy?",
        tags: [{ _id: "1", name: "python" }, { _id: "2", name: "Sql" }],
        author: { _id: "1", name: "John Doe", picture: "" },
        upvotes: "11",
        views: 670000,
        answers: [],
        createdAt: new Date('2021-09-01T12:00:00.000Z')
    },
    {
        _id: "2",
        title: "How to center a div ? because I'm a Back-End Developer",
        tags: [{ _id: "1", name: "sql" }, { _id: "2", name: "css" }],
        author: { _id: "1", name: "Mike Doe", picture: "" },
        upvotes: "20",
        views: 111112,
        answers: [],
        createdAt: new Date('2022-04-13T06:00:00.000Z')
    },
    {
        _id: "3",
        title: "how to write a function?",
        tags: [{ _id: "1", name: "javascript" }, { _id: "2", name: "scss" }],
        author: { _id: "1", name: "John Doe", picture: "" },
        upvotes: "6",
        views: 140000000,
        answers: [],
        createdAt: new Date('2021-09-01T12:00:00.000Z')
    }
];
  
  return (
    <>
 <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'> 
  <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
  <Link href={'/ask-question'} className='flex justify-end max-sm:w-full'>
  <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>Ask a Question</Button>
  </Link>
 </div>
 <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
<LocalSearchBar route='/' iconPosition='left' imgSrc='/assets/icons/search.svg' otherClasses="flex-1" placeholder={''}/>
    <Filter filters={HomePageFilters} otherClasses={'min-h-[56px] sm:min-w-[170px] '} containerClasses={'hidden max-md:flex'}/>
 </div>
 <HomeFilters />
 <div className='mt-10 flex w-full flex-col gap-6'>
  {questions.length >0? questions.map((question)=>(
  <QuestionCard key={question._id} _id={question._id} title={question.title} tags={question.tags} author={question.author} upvotes={question.upvotes} views={question.views} answers={question.answers} createdAt={question.createdAt}/>
  )):<NoResult
  title={"There's no question to show"}
  desc={"Be the first to break the silence! 🐱‍👤 Ask a Question and kickstart the discussion. our queery could be the next big thing others learn from. Get involved! ⚡"}
  link="/ask-question"
  linkTitle="Ask a Question"
  />}
 </div>
 </>

  )
}

export default Home