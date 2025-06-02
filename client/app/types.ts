export type Movie = {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  genres: [{ id: string; name: string }];
};

export type Comment = {
  id: number;
  desc: string;
  movieId: number;
  userId: number;
};
