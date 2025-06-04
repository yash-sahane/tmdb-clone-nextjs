"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import authOptions from "../lib/authOptions";

export type Errors = {
  comment?: string;
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
    errors.comment = "Comment cannot be empty";
  }
  if (!movieId || isNaN(Number(movieId))) {
    errors.movieId = "Invalid movie ID";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const session = await getServerSession(authOptions);
  const username = session?.user?.name || session?.user?.email;

  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/comments/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment.trim(),
        movieId,
        username,
      }),
    });
    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }

  revalidatePath(`/movie/${movieId}`);

  return { errors: {} };
};
