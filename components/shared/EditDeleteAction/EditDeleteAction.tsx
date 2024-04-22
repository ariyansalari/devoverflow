'use client'
import { deleteQuestionAction } from '@/lib';
import { deleteAnswerAction } from '@/lib/actions/answer.action';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    type:string;
    itemId:string;
}
const EditDeleteAction = ({type,itemId}:Props) => {
    const pathname=usePathname()
    const router =useRouter()


    const handleEdit =()=>{
        router.push(`/question/edit/${JSON.parse(itemId)}`)
    }
    const handleDelete=async()=>{
        if(type ==='Question'){
            // delete question
            await deleteQuestionAction({questionId:JSON.parse(itemId),path:pathname})
        }else if (type==='Answer'){
            // delete answer 
            await deleteAnswerAction({answerId:JSON.parse(itemId),path:pathname})

        }
    }
  return (
    <div className='flex items-center justify-end gap-3 max-sm:w-full'>
{type ==='Question'&& (
    <Image src={'/assets/icons/edit.svg'} width={14} height={14} alt='edit' className='cursor-pointer object-contain ' onClick={handleEdit} />
)}
    <Image src={'/assets/icons/trash.svg'} width={14} height={14} alt='Delete' className='cursor-pointer object-contain ' onClick={handleDelete} />

    </div>
  )
}

export default EditDeleteAction