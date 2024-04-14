import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from '../RenderTag/RenderTag'

const RigthSideBar = () => {
    const hotQuestion =[{
        _id:1,title:"How do I use express as a custom server in NextJs?"
    },{
        _id:2,title:"Cascading deletes in SQLAlchemy?"
    },{
        _id:3,title:"How to Perfectly Center a Div with Tailwind CSS?"
    },{
        _id:4,title:"Best practices for data fetching in a Next.js application with Server-Sider Rendering (SSR)?"
    },{
        _id:5,title:"Redux Toolkit Not Updating State as Expected"
    }]
    const popularTag =[{
        _id:1,name:"javascript",totalQuestion :5
    },{
        _id:2,name:"react",totalQuestion :5
    },{
        _id:3,name:"vue",totalQuestion :5
    },{
        _id:4,name:"next",totalQuestion :5
    },{
        _id:5,name:"redux",totalQuestion :5
    }]
  return (
    <section className='background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-[350px]  flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
<div>
<h3 className='h3-bold text-dark300_light700'>Top Questions</h3>
<div className='mt-7 flex w-full flex-col gap-[30px]'>
{hotQuestion.map((question)=>(
<Link href={`/question/${question.title}`} key={question._id} className='flex cursor-pointer items-center justify-between gap-7'>
    <p className='body-medium text-dark500_light700'>{question.title}</p>
    <Image src={'/assets/icons/chevron-right.svg'} width={20} height={20} className="invert-colors" alt={'chevron right'}/>
</Link>
))}
</div>
</div>
<div className='mt-16'>
<h3 className='h3-bold text-dark500_light700'>Popular Tags</h3>
<div className='mt-7 flex flex-col gap-4 '>
{popularTag.map((tag)=>(
   <RenderTag key={tag._id} _id={tag._id} name={tag.name} totalQuestions={tag.totalQuestion} showCount/>
))}
</div>

</div>
    </section>
  )
}

export default RigthSideBar