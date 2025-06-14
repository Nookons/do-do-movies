'use client'
import React, {useEffect, useState} from 'react';
import {Container} from "@/components/shared/container";
import GenresGroup from "@/components/shared/genresGroup";
import {Alert, Pagination, Skeleton} from "@/components/ui";
import {useHomeState} from "@/store/homeState";
import {searchByQuery} from "@/utils/Search/searchByQuery";
import MovieGroup from "@/components/shared/movie-group";
import {list_type} from "@/types/Lists";
import {
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';
import SearchMovie from "@/components/shared/SearchMovie/SearchMovie";
import {Angry} from 'lucide-react';
import {AlertDescription, AlertTitle} from "@/components/ui/alert";

const Page = () => {
    const data = useHomeState(state => state.data);
    const setFilteredMovie = useHomeState(state => state.setFilteredMovie);


    const [page, setPage] = useState(1)
    const [genresState, setGenresState] = useState<string[]>([])

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const searchHandler = async () => {
            try {
                setIsLoading(true)
                const result = await searchByQuery({genresState, page})
                setFilteredMovie(result);
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(() => setIsLoading(false), 1000)
            }
        }

        searchHandler()
    }, [page, genresState, setFilteredMovie])


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
            <div className={`grid`}>
                <GenresGroup setGenresState={setGenresState}/>
                <SearchMovie />
            </div>

            {!isLoading
                ?
                <div>
                    {data.results.length < 1
                        ?
                        <Alert className={`mt-4`}>
                            <Angry size={16} />
                            <AlertTitle>We really tried our best</AlertTitle>
                            <AlertDescription>
                                We&apos;re sorry, but we can&apos;t find some movies for this filter option.
                            </AlertDescription>
                        </Alert>
                        :
                        <div>
                            <MovieGroup fetch_type={list_type.popular} result={data.results}/>
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


                                    {/*   {data.total_pages > 5 &&
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            }*/}

                                    {data.total_pages > 1 &&
                                        <PaginationItem>
                                            <PaginationNext onClick={() => buttonHandler('next')} href="#"/>
                                        </PaginationItem>
                                    }
                                </PaginationContent>
                            </Pagination>
                        </div>
                    }

                </div>
                :
                <div className={`grid py-4 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>
                    {Array.from({length: 20}).map((_, index) => (
                        <Skeleton key={index} className={`w-full h-150`} />
                    ))}
                </div>
            }
        </Container>
    );
};

export default Page;