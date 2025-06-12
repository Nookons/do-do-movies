import React from 'react';
import {IMovieSendData} from "@/types/Movie";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import {ExternalLink} from "lucide-react";

interface Props {
    list: IMovieSendData[] | undefined;
    title: string;
}

const UserList: React.FC<Props> = ({list, title}) => {

    if (list == undefined) return null;

    if (list.length <= 0) return null;

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full mt-6"
        >
            {/* Заголовок + Кнопки в одной строке */}
            <div className="flex rounded relative items-center justify-between mb-2">
                <div className="hidden sm:block">
                    <CarouselPrevious className={`absolute top-2.5 left-2`}/>
                    <CarouselNext className={`absolute top-2.5 left-12.5`}/>
                </div>
                <div className={`flex items-center gap-2`}>
                    <b className={`text-xs text-neutral-500`}>{title} ({list.length})</b>
                    <Link href="/">
                        <ExternalLink className={`text-primary hover:text-neutral-500 transition`} size={18} />
                    </Link>
                </div>
            </div>

            <CarouselContent className="-ml-2">
                {list.map((mov, index) => {

                    if (mov.poster_path === null) return null;

                    return (
                        <CarouselItem
                            key={index}
                            className="pl-2 flex-shrink-0 basis-1/3 sm:basis-1/3 md:basis-1/6 lg:basis-1/6 xl:basis-1/6"
                        >
                            <Link href={`/movies/${mov.id}`} passHref>
                                <Image
                                    className={`rounded-2xl`}
                                    width={250}
                                    height={250}
                                    src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                                    alt="@shadcn"/>
                                <b className={`text-xs`}>{mov.title}</b>
                            </Link>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
        </Carousel>
    );
};

export default UserList;