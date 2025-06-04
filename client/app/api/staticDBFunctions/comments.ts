import { comments } from "../data";

export const getComments = async (movieId: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });

  const movieComments = comments.filter(
    (comment) => comment.movieId === +movieId
  );

  return movieComments;
};

export const addComment = async (movieId: number, comment: string) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });

  console.log(comment, movieId);

  comments.push({
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    comment,
    movieId,
    userId: comments.length ? comments[comments.length - 1].id + 1 : 1,
  });
};
