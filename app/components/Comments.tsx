import React from "react";
import { getComments } from "../api/staticDBFunctions/comments";
import CommentCard from "./CommentCard";

const Comments = async ({ movieId }: { movieId: number }) => {
  const comments = await getComments(movieId);

  return (
    <>
      {comments.length ? (
        comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="bg-gray-300 rounded-sm p-1 text-black">
          No comments yet!
        </p>
      )}
    </>
  );
};

export default Comments;
