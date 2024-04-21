/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Button } from '@/components/ui/button'
import { sidebarLinks } from '@/constants'
import { SignedOut, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

 const LeftSideBar = () => {
    const pathname=usePathname()
    const {userId}=useAuth()
  return (
    <section className='background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:-w-[266px]'>
<div className="flex flex-1  flex-col gap-6 ">
{sidebarLinks.map((item)=>{
  const isActive =(pathname.includes(item.route)&& item.route.length>1)||pathname===item.route;
  if(item.route==='/profile'){
    if(userId){
      item.route=`${item.route}/${userId}`
    }else {
      return null
    }
  }
 return (
<Link key={item.label} href={item.route} className={`${isActive ? "primary-gradient text-ligh-900 rounded-lg ":"text-dark-300_light900 "} flex items-center justify-start gap-4 bg-transparent p-4`} >
  <Image className={`${isActive ? "" :"invert-colors"}`} src={item.imgURL} alt={item.label} width={20} height={20}/>
  <p className={`${isActive?"base-bold":"base-medium"} dark:text-dark100_light900 max-lg:hidden `}>{item.label}</p>
</Link>
 )
})}
</div>
        <div>
          <SignedOut>
            <div className="flex flex-col gap-3 max-lg:items-center ">
                <Link href={'/sign-in'}>
                  <Button className="w-full  small-medium btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                    <Image src={'/assets/icons/account.svg'} width={20} height={20} className='invert-colors lg:hidden' alt={'accountIcons'}/>
                    <span className="primary-text-gradient max-lg:hidden">Log In</span>
                  </Button>
                </Link>
                <Link href={'/sign-up'}>
                <Image src={'/assets/icons/sign-up.svg'} width={20} height={20} className='invert-colors lg:hidden' alt={'signUpIcons'}/>

                  <Button className="w-full small-medium light-border-2 btn-tertiary min-h-[41px] rounded-lg px-4 py-3 shadow-none text-dark400_light900 max-lg:hidden">
                  <span className=" max-lg:hidden">Sign Up</span>
                  </Button>
                </Link>
            </div>
            </SignedOut>
<h2 className='text-[12px] mt-4 select-none'>Developed by AriyanSalari&copy;</h2>

        </div>

    </section>
  )
}
export default LeftSideBar