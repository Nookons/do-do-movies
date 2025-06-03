import React from 'react';
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {IMovieResponse} from "@/types/Movie";
import {Title} from './title';
import MovieCardActions from "@/components/shared/movie-card-actions";

interface Props {
    className?: string;
    movie_data: IMovieResponse
}

const MovieCard: React.FC<Props> = ({className, movie_data}) => {

    const onClickHandle = () => {
        localStorage.setItem("movie_data", JSON.stringify(movie_data));
    }


    return (
        <div className={cn(`bg-secondary p-2 rounded`, className)}>
            <Link onClick={onClickHandle} className={`flex h-full flex-col align-bottom justify-between gap-4`}
                  href={`/movies/${movie_data.id}`}>
                <div className={`flex justify-center rounded-lg`}>
                    <Image className={`rounded transition group-hover:opacity-10`} width={750} height={750}
                           src={`https://image.tmdb.org/t/p/w500${movie_data.poster_path}`}
                           alt={movie_data.title || "Movie.ts poster"}/>
                </div>

                <div className={`flex justify-between gap-2 items-center`}>
                    <Title text={movie_data.title.length > 20 ? movie_data.title.slice(0, 20) : movie_data.title}
                           size={`xs`} className={` font-bold`}/>
                    <span className={`text-[12px] text-nowrap text-neutral-500`}>
                       {movie_data.release_date}
                    </span>
                </div>

                <MovieCardActions movie_data={movie_data} />
            </Link>
        </div>
    );
};

export default MovieCard;