import { type ClassValue, clsx } from "clsx"
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