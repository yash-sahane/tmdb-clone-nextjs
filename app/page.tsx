import React from "react";
import { Movie } from "./types";
import { URL } from "./constants";
import Search from "./components/Search";

type MovieResponse = {
  page: number;
  results: Movie[];
};

const Home = async () => {
  const response = await fetch(
    `${URL}/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const { results }: MovieResponse = await response.json();

  return <Search movies={results} />;
};

export default Home;
