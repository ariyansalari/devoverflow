'use client'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import React from 'react'

const HomeFilters = () => {
    const active='frequent';
  return (
    <div className='mt-10 flex-wrap gap-3 md:flex '>
        {HomePageFilters.map((item)=>(
            <Button key={item.value} onClick={()=>{}} className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active ===item.value?"bg-primary-100 text-primary-500":"bg-light-800 text-light-500"}`}>
{item.name}
            </Button>
            ))}
    </div>
  )
}

export default HomeFilters