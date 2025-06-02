import React from "react";
import { Comment } from "../types";
import { User } from "lucide-react";

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div key={comment.id} className="flex gap-2 text-black items-start">
      <div className="bg-gray-300 p-1 rounded-full">
        <User />
      </div>
      <div className="flex flex-col gap-1 p-1 px-2 bg-gray-300 rounded-sm w-full">
        <p className="font-semibold">Domniic</p>
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default CommentCard;
