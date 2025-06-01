'use client';
import React, { useEffect } from 'react';
import MovieCard from "@/components/shared/movie-card";
import { IMovieResponse } from "@/types/Movie";
import { cn } from '@/lib/utils';
import { Title } from './title';
import { useInView } from 'react-intersection-observer';
import {useCategoryStore} from "@/store/category";
import {list_type} from "@/types/Lists";

interface Props {
    className?: string;
    fetch_type: list_type;
    result: IMovieResponse[];
}

const MovieGroup: React.FC<Props> = ({ className, fetch_type, result }) => {
    const stateActiveCategory = useCategoryStore((state) => state.setActiveCategory)

    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    useEffect(() => {
        if (typeof fetch_type !== 'undefined' && inView) {
            stateActiveCategory(fetch_type);
        }
    }, [inView, fetch_type, stateActiveCategory]);


    return (
        <div ref={ref} id={fetch_type} className={cn('', className)}>
            <Title className="font-bold my-4" text={fetch_type} />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {result.map((mov) => (
                    <MovieCard key={mov.id} movie_data={mov} />
                ))}
            </div>
        </div>
    );
};

export default MovieGroup;
