'use client'
import React, {useCallback, useEffect, useState} from 'react';
import { Container } from "@/shared/container";
import GenresGroup from "@/shared/genresGroup";
import SearchDates from "@/shared/SearchMovie/SearchDates";
import SearchMovie from "@/shared/SearchMovie/SearchMovie";
import MovieGroup from "@/shared/movie-group";
import {list_type} from "@/types/Lists";
import {Alert, Button, Pagination, Skeleton} from "@/components/ui";
import {searchByQuery} from "@/utils/Search/searchByQuery";
import IMoviesResponse from '@/types/Movie';
import { AlertCircleIcon } from 'lucide-react';
import {AlertDescription, AlertTitle} from "@/components/ui/alert";
import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

const Page = () => {
    const [data, setData] = useState<IMoviesResponse | null>(null)

    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const onUpdateHandler = useCallback(async () => {
        const genres = localStorage.getItem("genres");
        const fromYear = localStorage.getItem("fromYear");
        const toYear = localStorage.getItem("toYear");

        const genresParse: number[] = JSON.parse(genres || '[]'); // safer fallback

        const obj = {
            genresParse,
            fromYear,
            toYear,
            page,
        };

        try {
            setIsLoading(true);
            const result = await searchByQuery({ obj });
            setData(result);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        onUpdateHandler();
    }, [onUpdateHandler]);

    if (!data) return null;

    const buttonHandler = (type: string) => {
        if (type === 'previous') {
            if (page === 1) return
            setPage(page - 1)
        }

        if (type === 'next') {
            if (page + 1 > data.total_pages) return
            setPage(page + 1)
        }
    }

    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-8">
                    <SearchMovie />
                </div>

                <div className="md:col-span-2 grid gap-6 grid-cols-1 md:grid-cols-[400px_1fr]">
                    <SearchDates />
                    <div>
                        <GenresGroup />
                    </div>
                </div>
            </div>
            <div>
                <Button className={`w-full`} onClick={onUpdateHandler}>Update List</Button>
            </div>
            <div>
                {isLoading
                    ?
                    <div className={`grid gap-4 my-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4`}>
                        {Array.from({length: 20}).map((_, i) => (
                            <Skeleton key={i} className={`w-full h-[250px] md:h-150`} />
                        ))}
                    </div>
                    :
                    <div>
                        {data?.results.length
                        ? <MovieGroup fetch_type={list_type.popular} result={data.results} />
                        :
                            <Alert className="mt-4" variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>No matching movies found.</AlertTitle>
                                <AlertDescription>
                                    <p>Try changing your search criteria and give it another go.</p>
                                </AlertDescription>
                            </Alert>
                        }
                    </div>
                }
                <div>
                    <Pagination className={`py-4`}>
                        <PaginationContent>
                            {data.total_pages > 1 &&
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => buttonHandler('previous')} href="#"/>
                                </PaginationItem>
                            }

                            {Array.from({length: data.total_pages}).slice(0, 5).map((_, index) => {
                                const pageNumber = page - 1 + index; // центрована навколо поточної сторінки

                                if (pageNumber < 1 || pageNumber > data.total_pages) return null;

                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            onClick={() => setPage(pageNumber)}
                                            href="#"
                                            isActive={page === pageNumber}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}


                            {data.total_pages > 1 &&
                                <PaginationItem>
                                    <PaginationNext onClick={() => buttonHandler('next')} href="#"/>
                                </PaginationItem>
                            }
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </Container>
    );
};

export default Page;
