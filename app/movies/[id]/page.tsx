'use client';

import React, {useEffect, useState} from 'react';
import {Container} from '@/components/shared/container';
import {IMovieDetailsResponse} from '@/types/Movie';
import Image from 'next/image';
import {Title} from "@/components/shared/title";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ChevronsLeft } from "lucide-react";
import {getMoviesDetails} from "@/components/getMovieDetails";
import {useRouter} from "next/navigation";
import {Skeleton} from "@/components/ui";
import {Badge} from '@/components/ui/badge';
import UserButton from "@/components/shared/user-button";
import MovieCardActions from "@/components/shared/movie-card-actions";

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

const Page = ({params}: MoviePageProps) => {
    const {id} = React.use(params);
    const router = useRouter();
    const [data, setData] = useState<IMovieDetailsResponse | null>(null)

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY || window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const data = await getMoviesDetails(id)
                setData(data as IMovieDetailsResponse);
                console.log(data);
            }

            fetchData();
        }
    }, [id])



    if (!data) {
        return (
            <Skeleton/>
        )
    }


    return (
        <Container className={`relative`}>
            <div className={`my-4 sticky top-0 z-10 backdrop-blur-2xl p-2 dark:bg-black/0 ${scrollY > 100 && 'dark:bg-black/30' } bg-white/50 flex justify-between gap-2 items-center`}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link  onClick={() => router.back()}
                                      className={`flex text-xs text-primary justify-center items-center gap-1`}
                                      href="#"><ChevronsLeft size={16}/> Back</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className={`text-xs`} href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className={`text-xs`} href="/movies">Movies</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage className={`text-md font-bold`}>{data.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className={`flex items-center justify-between gap-2`}>
                    {scrollY > 100 &&
                        <UserButton />
                    }
                </div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-[30vw_1fr] pb-20 gap-4 items-start`}>
                <div>
                    <Image
                        className="rounded transition group-hover:opacity-10"
                        width={750}
                        height={750}
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={data.title || 'Movie.ts poster'}
                    />
                </div>
                <div className={`grid grid-cols-1 gap-4`}>
                    <div>
                        <div className={`flex flex-wrap items-center gap-6 mb-3`}>
                            <Title className={`font-bold`} size={"lg"} text={data.title}/>
                            <MovieCardActions movie_data={data}/>
                        </div>
                        <div className={`flex flex-col gap-2 mt-4`}>
                            <p className={`text-neutral-600 font-bold text-xs`}>{data.release_date}</p>

                            <p className={`dark:text-neutral-300`}>{data.overview}</p>

                            <div className={`flex flex-wrap justify-start items-center gap-2`}>
                                <b>Genres:</b>
                                {data.genres.map(gen => (<Badge key={gen.name} variant={'outline'}>{gen.name}</Badge>))}
                            </div>

                            <div className={`flex flex-wrap justify-start items-center gap-2`}>
                                <b>Companie:</b>
                                {data.production_companies.map(companie => (
                                    <Badge key={companie.id} variant={'outline'}>{companie.name}</Badge>))}
                            </div>

                            <div className={`flex flex-wrap justify-start items-center gap-2`}>
                                <b>Country:</b>
                                {data.production_countries.map(country => (
                                    <Badge key={country.iso_3166_1} variant={'outline'}>{country.name}</Badge>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Page;
