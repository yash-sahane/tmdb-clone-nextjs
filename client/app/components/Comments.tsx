import React from "react";
// import { getComments } from "../api/staticDBFunctions/comments";
import CommentCard from "./CommentCard";
import { Comment } from "../types";
import { getServerSession } from "next-auth";
import authOptions from "../lib/authOptions";

const Comments = async ({ movieId }: { movieId: number }) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  console.log(token);

  let comments: Comment[] = [];
  try {
    const response = await fetch(
      `${process.env.SERVER_URI}/api/comments/${movieId}`,
      { headers: { Authorization: `Bearer ${token}` } }
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
