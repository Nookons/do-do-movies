import {Container} from "@/components/shared/container";
import TopBar from "@/components/shared/top-bar";
import Filters from "@/components/shared/filters";
import MovieFetch from "@/components/shared/movie-fetch";
import { list_type } from "@/types/Lists";



export default function Home() {

    return (
        <>
            <TopBar/>

            <Container className={`mt-10 pb-14`}>
                <div className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-[60px]`}>

                    {/*Filters*/}
                    <div className={`min-w-[250px] hidden md:block`}>
                        <Filters/>
                    </div>

                    {/*Movies list*/}
                    <div className={`flex flex-col gap-12`}>
                        <MovieFetch fetch_type={list_type.now}/>
                        <MovieFetch fetch_type={list_type.popular}/>
                        <MovieFetch fetch_type={list_type.top}/>
                    </div>
                </div>
            </Container>
        </>
    );
}
