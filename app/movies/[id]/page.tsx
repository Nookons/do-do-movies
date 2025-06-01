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
import {
    ArrowRight, Bookmark, BookmarkCheck, ChevronsLeft, CircleCheckBig, HandCoins,
    HandHeart, HeartPlus, LaptopMinimalCheck, TvMinimalPlay
} from "lucide-react";
import {getMoviesDetails} from "@/components/getMovieDetails";
import {useRouter} from "next/navigation";
import {Button, Skeleton} from "@/components/ui";
import {Badge} from '@/components/ui/badge';
import UserButton from "@/components/shared/user-button";
import {ModeToggle} from "@/components/ModeToggle/ModeToggle";
import {toast} from "sonner";
import dayjs from "dayjs";
import {addMovieToFavorite, addMovieToWatched, addMovieToWatchLater} from "@/utils/movie/movieActions";
import {useSession} from "next-auth/react";

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

const Page = ({params}: MoviePageProps) => {
    const {id} = React.use(params);
    const router = useRouter();
    const [data, setData] = useState<IMovieDetailsResponse | null>(null)

    const session = useSession();

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

    const onFavoriteHandle = async () => {
        if (data && data.id) {
            const result = await addMovieToFavorite({movie_id: data.id.toString(), email: session.data?.user?.email});

            if (result?.success) {
                toast(<article className={`flex items-center gap-2`}> <span className={`text-green-500 text-xs font-medium`}><HandHeart size={22} /></span> {data?.title}</article>, {
                    description: <span className={`text-neutral-500 text-xs`}>{dayjs().format('dddd, MMMM MM, YYYY [at] hh:mm')}</span>,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        }
    }

    const onWatchedHandler = async () => {
        if (data && data.id) {
            const result = await addMovieToWatched({movie_id: data.id.toString(), email: session.data?.user?.email});

            if (result?.success) {
                toast(<article className={`flex items-center gap-2`}> <span className={`text-green-500 text-xs font-medium`}><LaptopMinimalCheck size={22} /></span> {data?.title}</article>, {
                    description: <span className={`text-neutral-500 text-xs`}>{dayjs().format('dddd, MMMM MM, YYYY [at] hh:mm')}</span>,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        }
    }

    const onWatchLaterHandler = async () => {
        if (data && data.id) {
            const result = await addMovieToWatchLater({movie_id: data.id.toString(), email: session.data?.user?.email});

            if (result?.success) {
                toast(<article className={`flex items-center gap-2`}> <span className={`text-green-500 text-xs font-medium`}><BookmarkCheck size={22} /></span> {data?.title}</article>, {
                    description: <span className={`text-neutral-500 text-xs`}>{dayjs().format('dddd, MMMM MM, YYYY [at] hh:mm')}</span>,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            }
        }
    }

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
                                <Link onClick={() => router.back()}
                                      className={`flex text-primary justify-center items-center gap-1`}
                                      href="#"><ChevronsLeft size={16}/> Back</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/movies">Movies</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{data.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className={`flex items-center justify-between gap-2`}>
                    {scrollY > 100 &&
                        <UserButton />
                    }
                    {scrollY > 100 &&
                        <ModeToggle />
                    }
                </div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-[30vw_1fr] gap-4 items-start`}>
                <div>
                    <Image
                        className="rounded transition group-hover:opacity-10"
                        width={750}
                        height={750}
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={data.title || 'Movie.ts poster'}
                    />
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-[50px_1fr] gap-4`}>

                    <div className={`flex md:flex-col gap-2 mb-4`}>
                        <Button><TvMinimalPlay/></Button>
                        <Button onClick={onFavoriteHandle} variant={`outline`}>
                            <HeartPlus/>
                        </Button>
                        <Button onClick={onWatchedHandler} variant={`outline`}><CircleCheckBig/></Button>
                        <Button onClick={onWatchLaterHandler} variant={`outline`}><Bookmark/></Button>
                    </div>

                    <div>
                        <div className={`flex items-center gap-6 mb-3`}>
                            <Title className={`font-bold`} size={"lg"} text={data.title}/>
                            <p className={`text-neutral-600 font-bold text-xs`}>{data.release_date}</p>
                        </div>
                        <div>
                            <Button
                                className={`flex group cursor-pointer justify-center overflow-hidden relative items-center gap-2`}>
                                <HandCoins className={`group-hover:opacity-0 opacity-100 transition`}/>
                                <b className={`group-hover:opacity-0 opacity-100 group-hover:translate-x-2 duration-500 transition`}>12.34$</b>
                                <b className={`group-hover:opacity-100 opacity-0 absolute -translate-x-4 duration-500 group-hover:translate-x-0 flex items-center gap-1 transition`}>Buy
                                    now <ArrowRight/></b>
                            </Button>
                        </div>
                        <div className={`flex flex-col gap-2 mt-4`}>
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
