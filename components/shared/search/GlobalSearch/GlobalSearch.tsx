'use client'
import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

 const GlobalSearch = () => {
  const  router =useRouter()
  const pathname=usePathname()
  const searchParams=useSearchParams()
  const query=searchParams.get('q')
  const [search,setSearch]=useState(query||'')
  useEffect(()=>{
const delayDebounceFn=setTimeout(()=>{
if(search){
  const newUrl=formUrlQuery({
    params:searchParams.toString(),
    key:"q",
    value:search
  })
  router.push(newUrl,{scroll:false})
}else {
  console.log(route,pathname);
  if(pathname===route){
    const newUrl=removeKeysFromQuery({
      params:searchParams.toString(),
      keyToremove:['q']
    })
    router.push(newUrl,{scroll:false})
  }
  
}
},300)
  },[search,pathname,router,searchParams,query])
  return (
    <div className='relative w-full max-w-[600px] max-lg:hidden '>
        <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
<Image src={'/assets/icons/search.svg'} alt='search' width={24} height={24} className='cursor-pointer'/>
<Input type='text' placeholder='Search globally' className='paragraph-regular no-focus shadow-none  background-light800_darkgradient border-none outline-none '/>
        </div>
    </div>
  )
}
export default GlobalSearch
