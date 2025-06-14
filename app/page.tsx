import {Container} from "@/components/shared/container";
import MovieFetch from "@/components/shared/movie-fetch";
import {list_type} from "@/types/Lists";
import React from "react";
import {Button} from "@/components/ui";
import {Search, TextSearch} from "lucide-react";
import Link from "next/link";

export default function Home() {

    return (
        <>
            <Container className={`pb-14`}>
                <div className={`grid grid-cols-1 gap-[20px]`}>

                    <div className={`w-full flex justify-end`}>
                        <Link href="/search">
                            <Button className={`group relative`}>
                                <TextSearch className={`group-hover:opacity-100 opacity-0 absolute -translate-x-2 group-hover:-translate-x-11 transition duration-300`} />
                                <Search className={`block group-hover:translate-x-2 group-hover:opacity-0 transition duration-300`} />
                                Go to Search
                            </Button>
                        </Link>
                    </div>

                    {/*View ports*/}
                    <div>
                        <MovieFetch fetch_type={list_type.now}/>
                        <MovieFetch fetch_type={list_type.popular}/>
                        <MovieFetch fetch_type={list_type.top}/>
                    </div>
                </div>
            </Container>
        </>
    );
}
