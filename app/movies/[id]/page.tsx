'use client';

import React, {useEffect, useState} from 'react';
import {Container} from '@/components/shared/container';
import {ICreditsResponse, IMovieDetailsResponse, IMovieVideosResponse, IVideo} from '@/types/Movie';
import Image from 'next/image';
import {Title} from "@/components/shared/title";
import {getMoviesDetails} from "@/components/getMovieDetails";
import {Skeleton} from "@/components/ui";
import {Badge} from '@/components/ui/badge';
import MovieCardActions from "@/components/shared/movie-card-actions";
import {getMovieVideos} from "@/utils/movie/getMovieVideos";
import {getMovieCredits} from "@/utils/movie/getMovieCredits";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link";

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

const Page = ({params}: MoviePageProps) => {
    const {id} = React.use(params);

    const [data, setData] = useState<IMovieDetailsResponse | null>(null)
    const [videos_data, setVideos_data] = useState<IVideo | null>(null)

    const [credits_data, setCredits_data] = useState<ICreditsResponse | null>(null)

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

            const fetchVideosCredits = async () => {
                const data: ICreditsResponse = await getMovieCredits(id)
                setCredits_data(data);
                console.log(data);
            }

            fetchData();
            fetchVideosData();
            fetchVideosCredits();
        }
    }, [id])

    const creditsHandler = (id: string) => {
        localStorage.setItem('credit_id', id)
    }


    if (!data) {
        return (
            <Skeleton/>
        )
    }


    return (
        <Container className={`relative`}>
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
                    <div className={`flex flex-wrap justify-start items-center gap-2`}>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            {/* Заголовок + Кнопки в одной строке */}
                            <div className="flex rounded relative items-center justify-between mb-6">
                                <div className="hidden sm:block">
                                    <CarouselPrevious className={`absolute top-6.5 left-2`}/>
                                    <CarouselNext className={`absolute top-6.5 left-12.5`}/>
                                </div>
                                <b>Actors:</b>
                            </div>

                            {/* Содержимое карусели */}
                            <CarouselContent className="-ml-2">
                                {credits_data?.cast.map((member, index) => {

                                    if (member.profile_path === null) return null;

                                    return (
                                        <CarouselItem
                                            key={index}
                                            className="pl-2 flex-shrink-0 basis-1/3 sm:basis-1/6 md:basis-1/6 lg:basis-1/8 xl:basis-1/8"
                                        >
                                            <Link onClick={() => creditsHandler(member.id.toString())} href={`/credits/${member.id}`} passHref>
                                                <Image
                                                    className={`rounded-2xl`}
                                                    width={250}
                                                    height={250}
                                                    src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                                                    alt="@shadcn"/>
                                                <span className={`text-xs`}>{member.name}</span>
                                            </Link>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    {videos_data &&
                        <div className="w-full border-t border-white border-dashed">
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
