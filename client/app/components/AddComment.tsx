"use client";

import React, { useActionState, useEffect } from "react";
import { commentSubmitHandler, FormState } from "../actions/comment";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const initialState: FormState = {
  errors: {},
  message: "",
  success: false,
};

const AddComment = ({ movieId }: { movieId: number }) => {
  const [state, formAction] = useActionState(
    commentSubmitHandler,
    initialState
  );

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div className="">
      <p className="text-lg font-semibold">Add you comment</p>
      <form action={formAction}>
        <input type="hidden" name="movieId" value={movieId} readOnly />
        <div className="flex relative bg-zinc-900 rounded-md">
          <textarea
            name="comment"
            id="comment"
            rows={2}
            placeholder="Enter your comment"
            className="resize-none p-1 px-2 mb-12 mt-1 w-full bg-zinc-900 text-white rounded-md outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 bottom-2 flex items-center gap-1 bg-white text-black p-1 px-2 rounded-md"
          >
            Submit <Send size={16} />{" "}
          </button>
        </div>
        {state?.errors && (
          <p className="text-sm text-red-500">{state?.errors.comment}</p>
        )}
      </form>
    </div>
  );
};

export default AddComment;
