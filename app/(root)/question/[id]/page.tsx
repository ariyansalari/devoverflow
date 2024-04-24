import Answer from '@/components/forms/Answer/Answer'
import AllAnswers from '@/components/shared/AllAnswers/AllAnswers'
import Metric from '@/components/shared/Metric/Metric'
import ParseHTML from '@/components/shared/ParseHTML/ParseHTML'
import RenderTag from '@/components/shared/RenderTag/RenderTag'
import Votes from '@/components/shared/Votes/Votes'
import { getQuestionById } from '@/lib'
import { getUserById } from '@/lib/actions/user.action'
import { formatNumbers, getTimestamp } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata:Metadata ={
  title:"Question | Dev Overflow",

}
const page =async ({searchParams,params}) => {
    const {userId:clerkId}=auth()
    let mongoUser;

    if(clerkId ){
        mongoUser=await getUserById({userId:clerkId})
    }

    const result =await getQuestionById ({questionId:params.id})
    
  return (
    <>
    <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
            <Link className="flex items-center justify-start gap-1" href={`/profile/${result.author?.clerkId}`}>
            <Image src={result.author?.picture} width={22} height={22} alt='profile' className='rounded-full'/>
            <p className='paragraph-semibold text-dark300_light700'>{result.author?.name}</p>
            </Link>
            <div className='flex justify-end'>
            <Votes
          type='Question'
          itemId={JSON.stringify(result._id)}
          userId={JSON.stringify(mongoUser._id)}
          upvotes={result?.upvotes?.length}
          hasupVoted={result.upvotes?.includes(mongoUser._id)}
          downvote={result.downvotes?.length}
          hasdownVoted={result.downvotes?.includes(mongoUser._id)}
          hasSaved={mongoUser?.saved?.includes(result._id)}
          />
            </div>
        </div>
        <h2 className='h2-semibold text-dark200_light800 mt-3.5 w-full text-left'>{result.title}</h2>
    </div>
    <div className='mb-8 mt-5 flex flex-wrap gap-4 '>
    <Metric 
            imgUrl="/assets/icons/clock.svg"
            alt="clock icon"
            value={` asked ${getTimestamp(result.createdAt??'')}`}
            title="Asked"
            textStyles="small-medium text-dark400_light800"
            />
                  <Metric 
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumbers(result.answers?.length ?? 0)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
            />
                  <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumbers(result.views??0)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
            />
    </div>
    <ParseHTML data={result.content} />
    <div className='mt-8 flex flex-wrap gap-2'>
        {result.tags?.map((tag:any)=>(
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} showCount={false}/>
        ))}
    </div>
<AllAnswers questionId={result._id} userId={mongoUser._id}         totalAnswers={result?.answers?.length} filter={searchParams?.filter}
 />
    <Answer question={result.content} questionId={JSON.stringify(result._id)} authorId={JSON.stringify(mongoUser._id)} />
    </>
  )
}

export default page