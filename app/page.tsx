import {Container} from "@/shared/container";
import MovieFetch from "@/shared/movie-fetch";
import {list_type} from "@/types/Lists";
import React from "react";
import {Button} from "@/components/ui";
import {Search, TextSearch} from "lucide-react";
import Link from "next/link";
import IsWatch from "@/widgets/model/isWatch";

export default function Home() {

    return (
        <>
            <Container className={`pb-14`}>
                <div className={`grid grid-cols-1 gap-[20px]`}>

                    <div>
                        <IsWatch />
                    </div>

                    <div className={`w-full flex justify-end`}>
                        <Link className={`w-full`} href="/search">
                            <Button className={`group w-full relative`}>
                                <TextSearch className={`group-hover:opacity-100 opacity-0 absolute -translate-x-4 group-hover:-translate-x-16 transition duration-300`} />
                                <Search className={`block group-hover:translate-x-16 group-hover:opacity-0 transition duration-300`} />
                                <span className={`text-lg font-semibold`}>Go to Search</span>
                            </Button>
                        </Link>
                    </div>
                    {/*View ports*/}
                    <div>
                        <MovieFetch fetch_type={list_type.now}/>
                    </div>
                </div>
            </Container>
        </>
    );
}
