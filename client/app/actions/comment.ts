"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import authOptions from "../lib/authOptions";
import { ResponseType } from "../types";

export type Errors = {
  comment?: string;
  movieId?: string;
};

export type FormState = {
  errors: Errors;
  success?: boolean;
  message?: string;
};

export const commentSubmitHandler = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
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
  const token = session?.accessToken;

  console.log("token is : ", token);

  let message: string = "";
  let success: boolean = false;

  try {
    const response = await fetch(`${process.env.SERVER_URI}/api/comments/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: comment.trim(),
        movieId,
        username,
      }),
    });
    const data: ResponseType = await response.json();
    success = data.success as boolean;
    message = data.message as string;
  } catch (err) {
    console.log(err);
  }

  revalidatePath(`/movie/${movieId}`);

  return { errors: {}, success, message };
};
