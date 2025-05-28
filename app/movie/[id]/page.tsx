import Comment from "@/app/components/Comment";
import { IMAGE_BASE_URL, URL } from "@/app/constants";
import authOptions from "@/app/lib/authOptions";
import { Movie } from "@/app/types";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const MovieDetails = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const response = await fetch(
    `${URL}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  const { name, overview, backdrop_path, poster_path, genres }: Movie =
    await response.json();

  return (
    <div className="flex flex-col gap-4">
      <Link href="/" className="items-center gap-2hover:underline flex gap-1">
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="w-full sm:w-2/4 relative min-h-42">
          <Image
            src={`${IMAGE_BASE_URL}/${poster_path}`}
            alt="movie_img"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="w-full sm:w-2/4 flex flex-col gap-2">
          <div className="hidden sm:flex w-full relative min-h-42">
            <Image
              className="rounded-lg"
              src={`${IMAGE_BASE_URL}/${backdrop_path}`}
              alt="movie_img"
              fill
              objectFit="cover"
            />
          </div>
          <p className="text-lg sm:text-xl font-bold">{name}</p>
          <div className="flex gap-1">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="text-xs text-black bg-gray-400 rounded-sm p-1 flex"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-sm sm:text-base font-semibold">{overview}</p>
        </div>
      </div>
      <Comment movieId={id} />
    </div>
  );
};

export default MovieDetails;
