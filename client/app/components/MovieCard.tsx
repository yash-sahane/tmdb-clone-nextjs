import React from "react";
import { Movie } from "../types";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE_URL } from "../constants";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { id, name, overview, backdrop_path } = movie;

  return (
    <Link
      href={`movie/${id}`}
      className="flex flex-col gap-2 p-2 rounded-xl w-48 bg-zinc-900 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out"
    >
      <div className="relative h-24 w-full overflow-hidden rounded-lg">
        <Image
          src={`${IMAGE_BASE_URL}/${backdrop_path}`}
          alt="movie_img"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 text-white">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-300 line-clamp-3">{overview}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
