import React from 'react';
import {cn} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {IMovieResponse} from "@/types/Movie";
import {Title} from './title';
import MovieCardActions from "@/components/shared/movie-card-actions";
import {Flame} from "lucide-react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from '../ui/hover-card';

interface Props {
    className?: string;
    movie_data: IMovieResponse;
    index: number;
}

const MovieCard: React.FC<Props> = ({className, movie_data}) => {
    const onClickHandle = () => {
        localStorage.setItem("movie_data", JSON.stringify(movie_data));
    };

    return (
        <div className={cn("relative group rounded overflow-hidden", className)}>
            <HoverCard closeDelay={250} openDelay={500}>
                <HoverCardTrigger asChild>
                    <Link
                        onClick={onClickHandle}
                        className="flex flex-col align-bottom justify-between gap-4 relative z-10"
                        href={`/movies/${movie_data.id}`}
                    >
                        <div className="flex justify-center rounded-lg overflow-hidden">
                            <Image
                                className="rounded transition-all duration-300 group-hover:scale-105"
                                width={750}
                                height={750}
                                src={`https://image.tmdb.org/t/p/w500${movie_data.poster_path}`}
                                alt={movie_data.title || "Movie.ts poster"}
                            />
                        </div>
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent sideOffset={-400} className="w-100 left-0 ">
                    <div className="flex flex-col justify-between gap-4">
                        <div className={`flex justify-between gap-2 items-center`}>
                            <Title
                                text={movie_data.title}
                                size="xs"
                                className="font-bold line-clamp-1"
                            />
                            <MovieCardActions movie_data={movie_data}/>
                        </div>
                            <span className="text-[12px] flex gap-1 items-center text-primary text-nowrap">
                                <Flame size={12}/> {movie_data.popularity.toFixed(1)}
                            </span>
                        <p className={`text-x`}>{movie_data.overview}</p>
                        <span className="text-[12px] text-nowrap text-neutral-500">
                                {movie_data.release_date}
                            </span>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};

export default MovieCard;
