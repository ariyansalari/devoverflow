import { BadgeCounts } from '@/types';
import { BADGE_CRITERIA } from "@/constants";
import { type ClassValue, clsx } from "clsx"
import qs from "query-string";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
  const currentTime: Date = new Date();
  const timeDifference: number = currentTime.getTime() - createdAt.getTime();

  const minutes = 60 * 1000;
  const hours = 60 * minutes;
  const days = 24 * hours;
  const week = 7 * days;
  const month = 30 * days;
  const year = 365 * days;

  if (timeDifference < minutes) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hours) {
      const minutess = Math.floor(timeDifference / minutes);
      return `${minutess} ${minutess === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < days) {
      const hourss = Math.floor(timeDifference / hours);
      return `${hourss} ${hourss === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
      const dayss = Math.floor(timeDifference / days);
      return `${dayss} ${dayss === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < year) {
      const monthss = Math.floor(timeDifference / month);
      return `${monthss} ${monthss === 1 ? "month" : "months"} ago`;
  } else {
      const weekss = Math.floor(timeDifference / week);
      return `${weekss} ${weekss === 1 ? "week" : "weeks"} ago`;
  }
};



export const formatNumbers = (num: number): string => {
    if (num >= 1000000) {
      const formattedNum = (num / 1000000).toFixed(1);
      return `${formattedNum}M`;
    } else if (num >= 10000) {
      const formattedNum = (num / 1000).toFixed(1);
      return `${formattedNum}K`;
    } else {
      return num.toString();
    }
  };



export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const joinedDate = `${month} ${year}`;

  return joinedDate;
};

interface UrlQueryParams{
  params:string;
  key:string;
  value:string |null;

}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams{
  params:string;
  keys:string[]
}
export const removeKeysFromQuery = ({ params, keys }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keys.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface BadgeParam{
  criteria:{
    type:keyof typeof BADGE_CRITERIA;
    count:number;

  }[]
}
export const assignBadges=(params:BadgeParam)=>{

  const badgeCounts:BadgeCounts ={
    GOLD:0,
    SILVER:0,
    BRONZE:0
  }

  const {criteria}=params;

  criteria.forEach((item)=>{

    const {type,count}=item
    const badgeLevels:any=BADGE_CRITERIA[type]

      Object.keys(badgeLevels).forEach((level)=>{
        if(count >=badgeLevels[level]){
          badgeCounts[level as keyof BadgeCounts]+=1
        }
      })
    
  }
  )
  return badgeCounts
}