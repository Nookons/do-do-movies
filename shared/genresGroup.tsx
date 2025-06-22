'use client'
import React, {useEffect, useState} from 'react'
import {FilterCheckbox} from "@/shared/filter-checkbox"
import {getAllGenres} from "@/utils/Genres/getAllGenres"
import {Button, Skeleton} from "@/components/ui"
import {IGenre} from "@/types/Genre"
import {Ellipsis, EyeOff} from "lucide-react"

const GenresGroup = () => {
    const [genres, setGenres] = useState<IGenre[]>([])
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const [max_value, setMax_value] = useState(8)

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await getAllGenres()
                setGenres(genreData)
            } catch (error) {
                console.error('Failed to load genres', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGenres()
    }, [])

    // Загружаем выбранные жанры из localStorage при первом рендере
    useEffect(() => {
        const stored = localStorage.getItem("genres")
        if (stored) {
            try {
                setSelectedGenres(JSON.parse(stored))
            } catch (err) {
                setSelectedGenres([])
                console.log(err && err);
            }
        }
    }, [])

    const changeHandler = (checked: boolean, genreId: number) => {
        let updatedGenres = [...selectedGenres]

        if (checked) {
            if (!updatedGenres.includes(genreId)) {
                updatedGenres.push(genreId)
            }
        } else {
            updatedGenres = updatedGenres.filter(id => id !== genreId)
        }

        setSelectedGenres(updatedGenres)
        localStorage.setItem("genres", JSON.stringify(updatedGenres))
    }

    if (loading) return <Skeleton className="w-full h-50"/>

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Select genres what you liked</h2>
            <div className="rounded w-full grid grid-cols-1 gap-6 justify-center items-center ">
                <div className={`grid grid-cols-2 md:grid-cols-4`}>
                    {genres.slice(0, max_value).map((genre) => {
                        const isChecked = selectedGenres.includes(genre.id)

                        return (
                            <FilterCheckbox
                                key={genre.id}
                                checked={isChecked}
                                onCheckedChange={(checked) => changeHandler(checked, genre.id)}
                                text={genre.name}
                                value={String(genre.id)}
                            />
                        )
                    })}
                </div>
                <Button
                    onClick={() => setMax_value(prev => prev === 8 ? 99 : 8)}
                    variant="link"
                    className="w-full text-foreground md:col-span-5 col-span-3"
                >
                    {max_value === 8 ? <Ellipsis/> : <EyeOff/>}
                </Button>
            </div>
        </div>
    )
}

export default GenresGroup
