import UsersCard from '@/components/cards/UsersCard/UsersCard'
import Filter from '@/components/shared/Filter/Filter'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar/LocalSearchBar'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import Link from 'next/link'
import React from 'react'

const page = async() => {
const result=await getAllUsers({}
    )
  return (
    <>
    <h1 className='h1-bold text-dark100_light900'>All Users</h1>
    
   <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
  <LocalSearchBar route='/community' iconPosition='left' imgSrc='/assets/icons/search.svg' otherClasses="flex-1" placeholder={'Search for amazing minds'}/>
      <Filter filters={UserFilters} otherClasses={'min-h-[56px] sm:min-w-[170px] '} />
   </div>
   <section className='mt-12 flex flex-wrap gap-4 '>
{result.users.length>0?(result.users.map((user)=>(
    <UsersCard key={user.name} user={user}/>
))):(<div className='paragraph-regular text-dark-200_light800 max-w-4x1 mx-auto text-center '><p>No users yet</p>
<Link  className="mt-1 font-bold text-accent-blue" href={'/sign-up'}>Join to be the first</Link></div>)}
   </section>
   </>

  )
}

export default page