"use client";

import React, { useMemo, useState } from "react";
import { Movie } from "../types";
import MovieCard from "./MovieCard";

const Search = ({ movies }: { movies: Movie[] }) => {
  const [query, setQuery] = useState<string>("");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => movie.name.toLowerCase().includes(query));
  }, [query, movies]);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-center">
          <input
            className="bg-zinc-900 rounded-full py-2 px-4"
            type="text"
            name="query"
            placeholder="Search favourite movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="p-4 flex gap-4 flex-wrap justify-center">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Search;
