'use client';
import React from 'react';
import MovieCard from "@/components/shared/movie-card";
import {IMovieResponse} from "@/types/Movie";
import {cn} from '@/lib/utils';
import {list_type} from "@/types/Lists";
import {SquareArrowOutUpRight} from "lucide-react";
import {Button} from "@/components/ui";

interface Props {
    className?: string;
    fetch_type: list_type;
    result: IMovieResponse[];
}

const getTitle = (fetch_type: string) => {
    switch (fetch_type) {
        case 'now_playing':
            return (
                <div className={`flex items-center gap-2`}>
                    <span>Now playing</span>
                    <Button variant={"link"} className={`cursor-pointer`}><SquareArrowOutUpRight size={12}/></Button>
                </div>
            );
        case 'popular':
            return (
                <div className={`flex items-center gap-2`}>
                    <span>Popular</span>
                    <Button variant={"link"} className={`cursor-pointer`}><SquareArrowOutUpRight size={12}/></Button>
                </div>
            );
        case 'top_rated':
            return (
                <div className={`flex items-center gap-2`}>
                    <span>Top Rated</span>
                    <Button variant={"link"} className={`cursor-pointer`}><SquareArrowOutUpRight size={12}/></Button>
                </div>
            );
        default:
            return '';
    }
}

const MovieGroup: React.FC<Props> = ({className, fetch_type, result}) => {

    return (
        <div
            id={fetch_type}
            className={cn(
                'relative  w-full mx-auto rounded overflow-hidden',
                className
            )}
        >
            <div className="relative z-10">
                <div className="flex p-2 rounded relative items-center justify-between mb-4 px-2">
                    <article>{getTitle(fetch_type)}</article>
                </div>

                <div className={`grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4`}>
                    {result.map((mov, index) => (
                        <div
                            key={index}
                            className="pl-2 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/4"
                        >
                            <MovieCard index={index} movie_data={mov}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieGroup;
