import Question from '@/components/forms/Question/Question'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'


export const metadata:Metadata ={
  title:"Ask question | Dev Overflow",

}
const AskQuestion = async() => {
  const {userId}=auth()
  if(!userId) redirect('/sign-in')

  const mogoUser =await getUserById({userId})
  
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>
      <div className='mt-9'>
      <Question   mongoUserId={JSON.stringify(mogoUser?._id)}/>
      </div>
    </div>
  )
}

export default AskQuestion