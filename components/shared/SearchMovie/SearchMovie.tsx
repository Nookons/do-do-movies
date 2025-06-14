'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Avatar, Button, Input, Skeleton } from "@/components/ui";
import { Search, X } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter
} from '@/components/ui/drawer';
import { IMovieResponse } from "@/types/Movie";
import { searchMovies } from "@/utils/Search/SearchMovie";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

const SearchMovie = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<IMovieResponse[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedSearchValue = useDebounce(searchValue, 300);

    const fetchMovies = useCallback(async (term: string) => {
        if (term.length < 3) {
            setSearchResults(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const data = await searchMovies(term);
            setSearchResults(data);
        } catch (err) {
            setError("Failed to fetch movies. Please try again later.");
            console.error("Search error:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies(debouncedSearchValue);
    }, [debouncedSearchValue, fetchMovies]);

    const handleSearchSubmit = () => {
        if (searchValue.trim() && searchResults?.length) {
            setDrawerOpen(true);
        }
        inputRef.current?.blur();
    };

    const handleClearSearch = () => {
        setSearchValue("");
        setSearchResults(null);
        inputRef.current?.focus();
    };

    const handleResultSelect = () => {
        setSearchValue("");
        setSearchResults(null);
        setDrawerOpen(false);
    };

    const renderSearchList = () => {
        if (isLoading) {
            return (
                <div className="absolute w-full bg-background mt-1 z-50 rounded-lg shadow-lg border">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="p-3 flex items-center gap-3">
                            <Skeleton className="h-12 w-8 rounded" />
                            <Skeleton className="h-4 w-3/4 rounded" />
                        </div>
                    ))}
                </div>
            );
        }

        if (error) {
            return (
                <div className="absolute w-full bg-background mt-1 z-50 rounded-lg shadow-lg border p-3 text-destructive">
                    {error}
                </div>
            );
        }

        if (searchResults && searchResults.length > 0) {
            return (
                <ul
                    className="absolute w-full bg-background mt-1 z-50 rounded-lg shadow-lg border overflow-hidden"
                    aria-live="polite"
                >
                    {searchResults.slice(0, 5).map((movie) => (
                        <li key={`${movie.id}-${movie.title}`}>
                            <Link
                                href={`/movies/${movie.id}`}
                                className="flex items-center gap-3 p-3 hover:bg-accent transition-colors"
                                onClick={handleResultSelect}
                            >
                                <Avatar className="h-12 w-8 rounded">
                                    {movie.poster_path ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                            alt={movie.title}
                                            width={32}
                                            height={48}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="bg-muted flex items-center justify-center h-full text-xs">
                                            {movie.title.substring(0, 2)}
                                        </div>
                                    )}
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{movie.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {movie.release_date?.split('-')[0] || 'Year unknown'}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            );
        }

        if (searchResults?.length === 0 && searchValue.length >= 3) {
            return (
                <div className="absolute w-full bg-background mt-1 z-50 rounded-lg shadow-lg border p-3 text-muted-foreground">
                    No movies found
                </div>
            );
        }

        return null;
    };

    return (
        <div className="flex gap-2 w-full items-center mx-auto mb-6">
            <div className="relative flex-1">
                <div className="relative">
                    <Input
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="spider man..."
                        className="pr-10"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                        aria-label="Search movies"
                    />

                    {searchValue && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {renderSearchList()}
            </div>

            <Button
                onClick={handleSearchSubmit}
                disabled={isLoading || !searchValue.trim()}
                aria-label="Open search results"
            >
                <Search size={20} />
            </Button>

            <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent className="flex flex-col max-h-[90vh]">
                    <DrawerHeader>
                        <DrawerTitle>Search Results</DrawerTitle>
                        <DrawerDescription>
                            {searchValue ? `Results for: "${searchValue}"` : 'Your recent search'}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="flex-1  overflow-y-auto px-4 lg:px-40 pb-4">
                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {Array(8).fill(0).map((_, i) => (
                                    <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-8 text-destructive">
                                {error}
                            </div>
                        ) : (
                            <div className={cn(
                                "grid gap-4",
                                searchResults?.length === 1 ? "grid-cols-1 max-w-xs mx-auto" :
                                    "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                            )}>
                                {searchResults?.map((movie) => (
                                    movie.poster_path && (
                                        <Link
                                            key={`drawer-${movie.id}`}
                                            href={`/movies/${movie.id}`}
                                            onClick={handleResultSelect}
                                            className="group relative block rounded-lg overflow-hidden transition-transform hover:scale-105"
                                        >
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                alt={movie.title}
                                                width={500}
                                                height={750}
                                                className="aspect-[2/3] object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="absolute bottom-2 left-2 right-2">
                                                    <p className="text-white font-medium truncate">{movie.title}</p>
                                                    <p className="text-muted text-sm">
                                                        {movie.release_date?.split('-')[0] || 'Year unknown'}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                ))}
                            </div>
                        )}
                    </div>

                    <DrawerFooter>
                        <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default SearchMovie;