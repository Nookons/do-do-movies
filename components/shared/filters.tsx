import {cn} from '@/lib/utils';
import React from 'react';
import {Input} from '../ui';
import {Title} from "@/components/shared/title";
import {FilterCheckbox} from "@/components/shared/filter-checkbox";

interface Props {
    className?: string;
}

const movie_filter_options = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
];

const Filters: React.FC<Props> = ({className}) => {
    return (
        <div className={cn(`p-2 mt-4 rounded flex flex-col gap-2`, className)}>
            <Title text={`Filters`} size={'sm'} className={`mb-5 font-bold`}/>

            <div className={`mt-5 border-y border-y-neutral-700 py-6 pb-7`}>
                <p className={`font-bold mb-3`}>Year from to when:</p>
                <div className={`flex gap-3 mb-5`}>
                    <Input type={`number`} placeholder={`2000`} min={1950} max={2025}/>
                    <Input type={`number`} placeholder={`2025`} min={1950} max={2025}/>
                </div>
            </div>

            <div className={`flex flex-col gap-4 p-2 rounded`}>
                {movie_filter_options.map((option, index) => (
                    <FilterCheckbox key={`${index}-${option}`} text={option} value={`${index}`}/>
                ))}
            </div>
        </div>
    );
};

export default Filters;