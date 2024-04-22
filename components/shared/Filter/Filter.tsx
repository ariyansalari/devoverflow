'use client'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { formUrlQuery } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
interface Props {
filters:{
    name:string;
    value:string;
}[];
otherClasses?:string;
containerClasses?:string;
}
const Filter = ({filters,otherClasses,containerClasses}:Props) => {
  const searchParams=useSearchParams()
  const router=useRouter()

  const paramFilter=searchParams.get('filter');
  const handleUpdateClick=(value:string)=>{
const newUrl=formUrlQuery({
  params:searchParams.toString(),
  key:"filter",
  value
})
router.push(newUrl,{scroll:false})
  }
  return (
    <div className={`relative ${containerClasses} `}>
<Select onValueChange={handleUpdateClick} defaultValue={paramFilter || undefined}>
  <SelectTrigger className={`${otherClasses} body-regular light-border background-ligth800_dark300 text-dark500_light700 border px-5 py-2.5`}>
  <div className='line-clamp-1'>
  <SelectValue placeholder="Select a Filter" />

  </div>

  </SelectTrigger>
  <SelectContent>
 <SelectGroup >
    {filters.map((item)=>(
        <SelectItem key={item.value} value={item.value}>
            {item.name}
        </SelectItem>
    ))}
 </SelectGroup>
  </SelectContent>
</Select>
    </div>
  )
}

export default Filter