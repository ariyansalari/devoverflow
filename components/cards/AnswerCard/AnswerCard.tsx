import Link from "next/link";
import React from "react";
import { IQuestion } from "@/database/question.model";
import { SignedIn } from "@clerk/nextjs";
import Metric from "@/components/shared/Metric/Metric";
import { formatNumbers, getTimestamp } from "@/lib/utils";
import EditDeleteAction from "@/components/shared/EditDeleteAction/EditDeleteAction";

interface AnswerProps {
  _id: string;
  question: IQuestion;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId:string
  };
  upvotes: number;
  createdAt: Date;
  clerkId?: string | null;
}

const AnswerCard = ({
  _id,
  author,
  upvotes,
  question,
  createdAt,
  clerkId,
}: AnswerProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question?._id}/#${_id}`}
      className="card-wrapper block rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question?.title}
          </h3>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
        {/* If signed in add edit delete actions */}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumbers(upvotes)}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;