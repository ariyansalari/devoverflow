import React from 'react'
import Filter from '../Filter/Filter';
import { AnswerFilters } from '@/constants/filters';
import { getAnswer } from '@/lib/actions/answer.action';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import ParseHTML from '../ParseHTML/ParseHTML';
import Votes from '../Votes/Votes';
interface Props{
userId:string;
questionId:string;
totalAnswers:number;
page?:number;
filter?:number
}
const AllAnswers = async({questionId,userId,totalAnswers}:Props) => {
    const result=await getAnswer({
        questionId
    })
  return (
    <div className='mt-11'>
        <div className='flex items-ce   nter justify-between'>
            <h3 className='primary-text-gradient'>{totalAnswers} Answers</h3>

        <Filter filters={AnswerFilters}/>
        </div>

        <div>{result.answers.map((answer)=>(
      <article key={answer._id} className="light-border border-b py-10 ">
      <div className="mb-8 flex  w-full flex-col-reverse justify-evenly gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Link
          href={`/profile/${answer.author.clerkId}`}
          className="flex items-start gap-1 sm:items-center"
        >
          <Image
            src={answer.author.picture}
            width={18}
            height={18}
            alt="profile"
            className="rounded-full object-cover max-sm:mt-0.5"
          />
          <div className="flex flex-col sm:flex-row sm:items-center">
            <p className="body-semibold text-dark300_light700">
              {answer.author.name}
            </p>
            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden"> - </span> answered{" "}
              {getTimestamp(answer.createdAt)}
            </p>
          </div>
        </Link>
        <div className="flex justify-end ">
        <Votes
          type='Answer'
          itemId={JSON.stringify(answer._id)}
          userId={JSON.stringify(userId)}
          upvotes={answer.upvotes.length}
          hasupVoted={answer.upvotes.includes(userId)}
          downvote={answer.downvotes.length}
          hasdownVoted={answer.downvotes.includes(userId)}
          />
        </div>
      </div>
      <ParseHTML data={answer.content} />
    </article>
        ))}</div>
    </div>
  )
}

export default AllAnswers