'use client';

import React, {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {useUserStore} from "@/store/user";
import {Alert, Input, Skeleton} from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import {Title} from "@/components/shared/title";
import {IList} from "@/types/User";
import {BookX } from 'lucide-react';
import {AlertDescription, AlertTitle} from "@/components/ui/alert";

const Page = () => {
    const pathname = usePathname();
    const lastSegment = pathname.split('/').filter(Boolean).pop();
    const store_user = useUserStore(state => state.data);

    const [searchValue, setSearchValue] = useState<string>('')

    const [data, setData] = useState<IList[] | null>(null)

    useEffect(() => {
        switch (lastSegment) {
            case 'watch_later':
                if (searchValue.length > 1) {
                    setData(store_user?.watch_later_list?.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())) || []);
                } else {
                    setData(store_user?.watch_later_list || []);
                }
                break;
            case 'favorite':
                if (searchValue.length > 1) {
                    setData(store_user?.favorite_list?.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())) || []);
                } else {
                    setData(store_user?.favorite_list || []);
                }
                break;
            case 'watched_list':
                if (searchValue.length > 1) {
                    setData(store_user?.watched_list?.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())) || []);
                } else {
                    setData(store_user?.watched_list || []);
                }
                break;
            default:
                break;
        }
    }, [searchValue, lastSegment, store_user]);

    if (!store_user || !data) {
        return <Skeleton className="w-full h-80"/>
    }

    return (
        <Container>
            <div>
                <Title className={`text-neutral-500`} size={'xs'} text={`List`}/>
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className={`my-4`}
                    placeholder={`Search for movies here`}
                />
            </div>
            {!data.length &&
                <Alert>
                    <BookX />
                    <AlertTitle>Not yet</AlertTitle>
                    <AlertDescription>
                        It&apos;s seems what movie what you looking for still not in you list
                    </AlertDescription>
                </Alert>
            }
            <div className={`grid ${data.length === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-6'}  gap-4`}>
                {data.map((mov, index) => {

                    return (
                        <div key={index} className={cn("relative group rounded overflow-hidden")}>
                            <Link
                                className="flex flex-col align-bottom justify-between gap-4 relative z-10"
                                href={`/movies/${mov.id}`}
                            >
                                <div className="flex justify-center rounded-lg overflow-hidden">
                                    <Image
                                        className="rounded transition-all duration-300 group-hover:scale-105"
                                        width={400}
                                        height={400}
                                        src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                                        alt={mov.title || "Movie.ts poster"}
                                    />
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
};

export default Page;
