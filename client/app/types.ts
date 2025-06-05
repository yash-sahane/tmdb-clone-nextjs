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
  comment: string;
  movieId: number;
  userId?: number;
  username: string;
};

export type ResponseType = {
  success: boolean;
  message?: string;
  data?: any;
};
