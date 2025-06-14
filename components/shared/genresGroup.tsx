'use client'
import React, {useEffect, useState} from 'react';
import {FilterCheckbox} from "@/components/shared/filter-checkbox";
import {getAllGenres} from "@/utils/Genres/getAllGenres";
import {Button, Skeleton} from "@/components/ui";
import {IGenre} from "@/types/Genre";
import {Ellipsis, EyeOff} from "lucide-react";

interface Props {
    setGenresState: React.Dispatch<React.SetStateAction<string[]>>;
}

const GenresGroup: React.FC<Props> = ({setGenresState}) => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [loading, setLoading] = useState(true);

    const [max_value, setMax_value] = useState(5)


    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await getAllGenres();
                setGenres(genreData);
            } catch (error) {
                console.error('Failed to load genres', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    const test = (checked: boolean, genreId: number) => {
        if (checked && genreId) {
            setGenresState((prevState) => ([
                ...prevState, genreId.toString()
            ]))
        }

        if (!checked) {
            setGenresState((prevState) => (prevState.filter((item => item !== genreId.toString()))))
        }
    }

    if (loading) return <Skeleton className="w-full h-100"></Skeleton>

    return (
        <div className={`grid border border-dashed p-4 rounded justify-center items-center grid-cols-3 md:grid-cols-5 gap-6 my-4`}>
            {genres.slice(0,max_value).map((genre) => (
                <FilterCheckbox
                    onCheckedChange={(checked) => test(checked, genre.id)}
                    key={genre.id}
                    text={genre.name}
                    value={String(genre.id)}
                />
            ))}
            { max_value === 5
                ?  <Button onClick={() => setMax_value(99)} variant={`link`} className={`w-full md:col-span-5 col-span-3`}><Ellipsis /></Button>
                :  <Button onClick={() => setMax_value(5)} variant={`link`} className={`w-full md:col-span-5 col-span-3`}><EyeOff /></Button>
            }
        </div>
    );
};

export default GenresGroup;