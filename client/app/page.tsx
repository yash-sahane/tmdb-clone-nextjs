import React from "react";
import { Movie } from "./types";
import { URL } from "./constants";
import Search from "./components/Search";

type MovieResponse = {
  page: number;
  results: Movie[];
};

const Home = async () => {
  try {
    const response = await fetch(
      `${URL}/trending/tv/week?api_key=${process.env.TMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const { results }: MovieResponse = await response.json();

    return <Search movies={results} />;
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    return (
      <p className="text-center p-8 text-red-500">Failed to load movies.</p>
    );
  }
};

export default Home;
