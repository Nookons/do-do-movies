'use client';
import React from 'react';
import MovieCard from "@/components/shared/movie-card";
import {IMovieResponse} from "@/types/Movie";
import {cn} from '@/lib/utils';
import {list_type} from "@/types/Lists";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '../ui/carousel';
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
                    <Button variant={"link"} className={`cursor-pointer`}><SquareArrowOutUpRight size={12} /></Button>
                </div>
            );
        case 'popular':
            return (
                <div className={`flex items-center gap-2`}>
                    <span>Popular</span>
                    <Button variant={"link"} className={`cursor-pointer`}><SquareArrowOutUpRight size={12} /></Button>
                </div>
            );
        case 'top_rated':
            return (
                <div className={`flex items-center gap-2`}>
                    <span>Top Rated</span>
                    <Button variant={"link"} className={`cursor-pointer`}><SquareArrowOutUpRight size={12} /></Button>
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
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <div className="flex p-2 rounded relative items-center justify-between mb-4 px-2">
                        <div>
                            <CarouselPrevious className="absolute top-6.5 left-2" />
                            <CarouselNext className="absolute top-6.5 left-12.5" />
                        </div>
                        <article>{getTitle(fetch_type)}</article>
                    </div>

                    <CarouselContent className="-ml-2">
                        {result.map((mov, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-2 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/4"
                            >
                                <MovieCard index={index} movie_data={mov} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default MovieGroup;
