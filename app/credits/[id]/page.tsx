'use client';
import {Container} from "@/components/shared/container";
import React, {useEffect, useState} from "react";
import {getCreditData} from "@/utils/credit/getCreditData";
import {ICreditCombine, ICreditDetails} from "@/types/Credit";
import {Button, Skeleton} from "@/components/ui";
import Image from "next/image";
import {Title} from "@/components/shared/title";
import {Badge} from "@/components/ui/badge";
import {getCombineCredits} from "@/utils/credit/getCombineCredits";
import dayjs from "dayjs";
import {IMovieResponse} from "@/types/Movie";
import Link from "next/link";
import {Ellipsis, EyeOff} from "lucide-react";

const Page = () => {
    const credit_id = localStorage.getItem('credit_id');
    const [expanded, setExpanded] = useState(false);

    const [credit_data, setCredit_data] = useState<ICreditDetails | null>(null)
    const [combine_data, setCombine_data] = useState<IMovieResponse[] | null>(null)

    useEffect(() => {
        const getData = async () => {
            if (credit_id) {
                const result: ICreditDetails = await getCreditData(credit_id);
                const result_combine: ICreditCombine = await getCombineCredits(credit_id);

                setCredit_data(result);

                if (result_combine) {
                    const sorted = result_combine.cast.sort((a, b) => dayjs(b.release_date).valueOf() - dayjs(a.release_date).valueOf());
                    setCombine_data(sorted);
                }
            }
        }

        getData()
    }, [credit_id])

    if (!credit_id) return null;

    if (!credit_data) {
        return (
            <div className={`flex flex-col gap-2`}>
                <Skeleton className={`w-full h-100`}/>
                <Skeleton className={`w-full h-40`}/>
                <Skeleton className={`w-full h-10`}/>
            </div>
        )
    }
    ;

    return (
        <Container>
            <div className={`grid grid-cols-1 md:grid-cols-[500px_1fr] gap-2`}>
                <div>
                    <Image
                        className={`rounded-2xl`}
                        width={500}
                        height={500}
                        src={`https://image.tmdb.org/t/p/original/${credit_data.profile_path}`}
                        alt="@shadcn"/>
                </div>
                <div>
                    <Title size={`xl`} className={`font-bold p-0 m-0`} text={credit_data.name}/>
                    <div className={`my-2 flex flex-wrap gap-2`}>
                        {credit_data.also_known_as.map((name, index) => (
                            <Badge key={index} variant={`secondary`}>{name}</Badge>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <p className={`${expanded ? '' : 'line-clamp-3'}`}>
                            {credit_data.biography}
                        </p>
                        <Button
                            variant={`link`}
                            className="underline w-full cursor-pointer"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? <EyeOff /> : <Ellipsis />}
                        </Button>
                    </div>
                    <div className={`mt-8`}>
                        <b>Other movies:</b>
                        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 pb-20`}>
                            {combine_data?.map((data, index) => {

                                if (!data.poster_path) return null;

                                return (
                                    <Link href={`/movies/${data.id}`} key={index}>
                                        <Image
                                            className={`rounded-2xl`}
                                            width={250}
                                            height={250}
                                            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                                            alt={`${data.title} Error`}/>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Page;
