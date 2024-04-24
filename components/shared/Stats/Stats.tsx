import { formatNumbers } from '@/lib/utils';
import { BadgeCounts } from '@/types';
import Image from 'next/image';
import React from 'react'


interface StatsCardProps {
    imgUrl:string;
    value:number;
    title:string;
}
const StatsCard =({imgUrl,value,title}:StatsCardProps)=>{
    return (
            <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300  dark:shadow-light-200'>
            <Image src={imgUrl} alt={title} width={40} height={50}/>
            <div className='paragraph-semibold text-dark-200_light900'>
                    <p>{value}</p>
                    <p className='body-medium text-dark400_light700'>{title}</p>
                </div>
        </div>
    )
}
interface Props {
    totalQuestions:number;
    totalAnswer:number;
    badge:BadgeCounts;
    reputation:number;
}
const Stats = ({totalAnswer,totalQuestions,badge,reputation}:Props) => {
  return (
    <div className='mt-10'>
        <h4 className='h3-semibold text-dark-200_light900'>Stats - {reputation}</h4>
        <div className='mt-5 grid gird-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
            <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300  dark:shadow-light-200'>

                <div className='paragraph-semibold text-dark-200_light900'>
                    <p>{formatNumbers(totalQuestions)}</p>
                    <p className='body-medium text-dark400_light700'>Questions</p>
                </div>
                <div className='paragraph-semibold text-dark-200_light900'>
                    <p>{formatNumbers(totalAnswer)}</p>
                    <p className='body-medium text-dark400_light700'>Answers</p>
                </div>
            </div>
            <StatsCard imgUrl='/assets/icons/gold-medal.svg' value={badge.GOLD}  title="Gold Badges"/>
            <StatsCard imgUrl='/assets/icons/silver-medal.svg' value={badge.SILVER}  title="Silver Badges"/>
            <StatsCard imgUrl='/assets/icons/bronze-medal.svg' value={badge.BRONZE}  title="Bronze Badges"/>

        </div>
    </div>
  )
}

export default Stats