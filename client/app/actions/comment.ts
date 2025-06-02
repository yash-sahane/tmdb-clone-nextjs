"use server";

import { revalidatePath } from "next/cache";
import { addComment } from "../api/staticDBFunctions/comments";

export type Errors = {
  desc?: string;
  movieId?: string;
};

export type FormState = {
  errors: Errors;
};

export const commentSubmitHandler = async (
  prevState: FormState,
  formData: FormData
) => {
  const comment = formData.get("comment") as string;
  const movieId = formData.get("movieId") as string;

  const errors: Errors = {};

  if (!comment?.trim()) {
    errors.desc = "Comment cannot be empty";
  }
  if (!movieId || isNaN(Number(movieId))) {
    errors.movieId = "Invalid movie ID";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await addComment(parseInt(movieId), comment.trim());

  revalidatePath(`/movie/${movieId}`);

  return { errors: {} };
};
