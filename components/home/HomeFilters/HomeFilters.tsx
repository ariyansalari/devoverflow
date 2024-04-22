'use client'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const router = useRouter();
  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className='mt-10 flex-wrap gap-3 md:flex '>
        {HomePageFilters.map((item)=>(
            <Button onClickCapture={()=>handleTypeClick(item.value)} key={item.value} onClick={()=>{}} className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active ===item.value?"bg-primary-100 text-primary-500":"bg-light-800 text-light-500"}`}>
{item.name}
            </Button>
            ))}
    </div>
  )
}

export default HomeFilters