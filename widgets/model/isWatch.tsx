'use client';

import React, {useEffect, useState} from 'react';
import {useUserStore} from "@/store/user";
import {Input} from "@/components/ui";
import {IMovieSendData} from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";
import {useDebounce} from "@/hooks/useDebounce";
import {IListNotFinished} from "@/types/User";

const IsWatch = () => {
    const userData = useUserStore(state => state.data);

    const [inputValue, setInputValue] = useState<string>("");

    const [watchedData, setWatchedData] = useState<IMovieSendData[]>([]);
    const [notFinishedData, setNotFinishedData] = useState<IListNotFinished[]>([]);


    const debouncedInput = useDebounce(inputValue, 300);

    // Функция нормализации — убирает спецсимволы, лишние пробелы, переводит в нижний регистр
    const normalizeTitle = (str: string) => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9\s]/gi, '')  // удаляем всё, кроме букв, цифр и пробелов
            .replace(/\s+/g, ' ')          // заменяем несколько пробелов на один
            .trim();
    };

    useEffect(() => {
        if (!userData?.watched_list || !debouncedInput || debouncedInput.length < 3) {
            setWatchedData([]);
            setNotFinishedData([]);
            return;
        }

        if (!userData?.not_finished) return;

        const normalizedInput = normalizeTitle(debouncedInput);

        const watched = userData.watched_list.filter(item =>
            normalizeTitle(item.title).includes(normalizedInput)
        );

        const notFinished = userData.not_finished.filter(item =>
            normalizeTitle(item.title).includes(normalizedInput)
        );

        setWatchedData(watched);
        setNotFinishedData(notFinished);
    }, [userData, debouncedInput]);


    const isNoResults =
        watchedData.length === 0 &&
        notFinishedData.length === 0 &&
        debouncedInput.length >= 3;


    if (!userData) return null;

    return (
        <div className="">
            <div className="flex flex-col gap-2">
                <article className="text-xl font-bold">Did you forget?</article>
                <p className="text-neutral-500 text-xs">
                    Check whether you've watched a movie or series without opening your list.
                </p>

                <div className="relative">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter movie or series title"
                    />

                    {(watchedData.length > 0 || notFinishedData.length > 0 || isNoResults) && (
                        <div
                            className="absolute top-full mt-2 bg-secondary/70 backdrop-blur-2xl left-0 z-50 w-full p-4 rounded shadow-xl max-h-96 overflow-y-auto transition-all duration-300 animate-fade-in"
                        >

                        <div className="space-y-4">

                                {watchedData?.length > 0 && (
                                    <div>
                                        <h2 className="font-bold text-base mb-2">You've watched these</h2>
                                        <div className="space-y-2">
                                            {watchedData.map((item) => (
                                                <Link
                                                    href={`/movies/${item.id}`}
                                                    key={item.id}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/80 transition"
                                                >
                                                    <Image
                                                        width={250}
                                                        height={250}
                                                        src={
                                                            item.poster_path
                                                                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                                : '/placeholder.png'
                                                        }
                                                        alt={item.title}
                                                        className="w-18 h-28 object-cover rounded-lg"
                                                    />
                                                    <span className="text-sm font-semibold">{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {notFinishedData?.length > 0 && (
                                    <div>
                                        <h2 className="font-bold text-base mb-2">Not finished yet</h2>
                                        <div className="space-y-2">
                                            {notFinishedData.map((item) => (
                                                <Link
                                                    href={`/movies/${item.id}`}
                                                    key={item.id}
                                                    className="grid grid-cols-[75px_1fr] items-center gap-3 p-2 rounded-lg hover:bg-secondary/80 transition"
                                                >
                                                    <Image
                                                        width={250}
                                                        height={250}
                                                        src={
                                                            item.poster_path
                                                                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                                : '/placeholder.png'
                                                        }
                                                        alt={item.title}
                                                        className="w-18 h-28 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <span className="text-sm font-semibold">{item.title}</span>
                                                        <p className={`text-neutral-500 text-xs`}>You finished on:</p>

                                                        <div className="relative w-full">
                                                            <progress
                                                                className="w-full rounded-2xl overflow-hidden h-1"
                                                                value={item.user_runtime}
                                                                max={item.runtime}
                                                            />
                                                            <p
                                                                className="text-xs absolute top-6 text-primary"
                                                                style={{
                                                                    left: `${(Number(item.user_runtime) / item.runtime) * 100}%`,
                                                                    transform: 'translateX(-50%)',
                                                                }}
                                                            >
                                                               {item.user_runtime}m
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {isNoResults && (
                                    <p className="text-sm text-neutral-400 text-center py-2">
                                        Nothing found for "<strong>{debouncedInput}</strong>"
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IsWatch;
