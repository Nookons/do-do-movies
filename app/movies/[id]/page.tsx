'use client';

import React, {useEffect, useState} from 'react';
import {Container} from '@/components/shared/container';
import {IMovieDetailsResponse, IMovieVideosResponse, IVideo} from '@/types/Movie';
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
import {ChevronsLeft} from "lucide-react";
import {getMoviesDetails} from "@/components/getMovieDetails";
import {useRouter} from "next/navigation";
import {Skeleton} from "@/components/ui";
import {Badge} from '@/components/ui/badge';
import UserButton from "@/components/shared/user-button";
import MovieCardActions from "@/components/shared/movie-card-actions";
import {getMovieVideos} from "@/utils/movie/getMovieVideos";

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

const Page = ({params}: MoviePageProps) => {
    const {id} = React.use(params);
    const router = useRouter();

    const [data, setData] = useState<IMovieDetailsResponse | null>(null)
    const [videos_data, setVideos_data] = useState<IVideo | null>(null)

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY || window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
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
            }
            const fetchVideosData = async () => {
                const data: IMovieVideosResponse = await getMovieVideos(id)

                if (data) {
                    const result = data.results.find(video => video.name === "Official Trailer");
                    console.log(result);
                    setVideos_data(result || null);
                }
            }

            fetchData();
            fetchVideosData();
        }
    }, [id])


    if (!data) {
        return (
            <Skeleton/>
        )
    }


    return (
        <Container className={`relative`}>
            <div
                className={`my-4 sticky top-0 z-10 backdrop-blur-2xl p-2 dark:bg-black/0 ${scrollY > 100 && 'dark:bg-black/30'} bg-white/50 flex justify-between gap-2 items-center`}>
                {scrollY < 100 &&
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link onClick={() => router.back()}
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
                }
                {scrollY > 100 &&
                    <div className={`flex w-full items-center justify-between gap-2`}>
                        <div>
                            <h1>{data.title}</h1>
                        </div>
                        <div>
                            <UserButton/>
                        </div>
                    </div>
                }
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
                    {videos_data &&
                        <div className="w-full border-t border-white border-dashed p-2">
                            <article className={`my-2 font-bold`}>Watch trailer {data.title}</article>
                            <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden'}}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videos_data.key}?si=gUqTPBA2W5Dajctf`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 0,
                                    }}
                                ></iframe>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
};

export default Page;
