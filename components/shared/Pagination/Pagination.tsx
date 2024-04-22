'use client'
import { Button } from '@/components/ui/button'
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface Props{
    isNext:boolean;
    pageNumber:number
}
const Pagination = ({isNext,pageNumber}:Props) => {
    console.log(pageNumber);
    
    const router =useRouter()
    const searchParams=useSearchParams()
    const handleNavigation=(direction:string)=>{
        const nextPageNumber =direction==='prev'?pageNumber-1 :pageNumber+1;
        const newUrl =formUrlQuery({
            params:searchParams.toString(),
            key:"page",
            value:nextPageNumber.toString()
        })
         router.push(newUrl)
    }
    if(!isNext && pageNumber ===1) return null
  return (
    <div className='flex w-full items-center justify-center gap-2'>
        <Button disabled={pageNumber===1} onClick={()=>handleNavigation('prev')} className='light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2'>
          <p className='body-medium text-dark200_light800'>prev</p> 
            
            
            </Button>
            <div className='bg-primary-500 flex justify-center items-center rounded-md py-2 px-3.5 '>
                <p className='body-semibold text-light900'>{pageNumber}</p>
            </div>
            <Button disabled={!isNext} onClick={()=>handleNavigation('next')} className='light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2'>
          <p className='body-medium text-dark200_light800'>next</p> 
            
            
            </Button>
    </div>


  )
}

export default Pagination