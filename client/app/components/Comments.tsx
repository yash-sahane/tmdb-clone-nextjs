import React from "react";
// import { getComments } from "../api/staticDBFunctions/comments";
import CommentCard from "./CommentCard";
import { Comment } from "../types";

const Comments = async ({ movieId }: { movieId: number }) => {
  let comments: Comment[] = [];
  try {
    const response = await fetch(
      `${process.env.SERVER_URI}/api/comments/${movieId}`
    );
    const { data } = await response.json();
    comments = data;
    console.log(data);
  } catch (err) {
    console.log(err);
  }

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
