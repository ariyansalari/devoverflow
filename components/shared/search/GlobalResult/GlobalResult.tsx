'use client'
import React, { useEffect, useState } from 'react'
import {ReloadIcon} from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import GlobalFilters from '../GlobalFilters/GlobalFilters'
import { globalSearch } from '@/lib/actions/general.action'
const GlobalResult = () => {
    const searchParams=useSearchParams()
    const [isLoading,setIsLoading]=useState(false)
    const [result,setResult]=useState([
        {type:"question",id:1,title:"Next.js"},
        {type:"tag",id:2,title:"nest"},
        {type:"user",id:3,title:".jsm"}

    ])

    const global=searchParams.get('global')
    const type =searchParams.get('type')
    useEffect(()=>{
const fetchResult=async()=>{
    setResult([])
        setIsLoading(true)
        try{
// Everything everywhere all at once...
const res=await globalSearch({
    query:global,
    type
})
setResult(JSON.parse(res))
        }catch(error){
console.log(error);
throw error

        }finally{
            setIsLoading(false)
        }
}
if(global){
    fetchResult()
}
    },[global,type])
    
    const renderLink=(type:string,id:number)=>{
        switch(type){
            case 'question':
                return `/question/${id}`;
                case 'answer':
                    return `/question/${id}`;
                    case 'tag':
                        return `/tags/${id}`;
                        case 'user':
                            return `/profile/${id}`;
                            default : 
                            return '/'
        }
    }
  return (
    <div className='absolute top-full z-10 mt-3 w-full bg-light-800 rounded-xl py-5 shadow-sm dark:bg-dark-400 '>
            <p className='text-dark400_light900 px-5 paragraph-semibold '>
                <GlobalFilters/>
                 </p>
        
        <div  className='my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50'/>
<div className='space-y-5'>
    <p className='text-dark400_light900 px-5 paragraph-semibold '>Top Match</p>
{isLoading ? (
    <div className='flex-center flex-col px-5'>
        <ReloadIcon className='my-2 h-10 w-10 text-primary-500 animate-spin'/>
        <p className='text-dark200_light800 body-regular'>Browsing the entire database</p>
    </div>
):(
    <div className='flex flex-col gap-2'>

        {result.length>0?(
            result.map((item,index)=>(
<Link 
href={renderLink(item.type,item.id)}
key={item.type + item.id +index}
className=' flex w-full  cursor-pointer items-start gap-3 px-5 py-2.5   dark:hover:bg-light-700/50 hover:bg-light-700/50 ' 
>
    <Image src={'/assets/icons/tag.svg'} alt='tags' width={18} height={18} className='invert-color mt-1 object-contain'/>
    <div className='flex flex-col'>
        <p className='body-medium line-clamp-1 text-dark200_light800'>{item.title}</p>
        <p className='text-light400_light500 font-bold mt-1 small-medium capitalize '>{item.type}</p>
    </div>
</Link>
            ))
        ):(<div className='flex-center flex-col px-5'>

            <p className='text-dark200_light800 body-regular px-5 py-2.5'>Oops, no results found</p>
        </div>)}
    </div>
)}
</div>

    </div>
  )
}

export default GlobalResult