import React, { Suspense } from "react";
import AddComment from "./AddComment";
import Comments from "./Comments";

const Comment = async ({ movieId }: { movieId: number }) => {
  return (
    <div className="flex flex-col gap-2">
      <AddComment movieId={movieId} />
      <p className="text-lg font-semibold">Comments</p>
      <Suspense fallback={<p>Searching for comments...</p>}>
        <Comments movieId={movieId} />
      </Suspense>
    </div>
  );
};

export default Comment;
