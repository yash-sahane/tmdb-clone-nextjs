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

export const addComment = async (movieId: number, desc: string) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 2000);
  });

  console.log(desc, movieId);

  comments.push({
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    desc,
    movieId,
    userId: comments.length ? comments[comments.length - 1].id + 1 : 1,
  });
};
