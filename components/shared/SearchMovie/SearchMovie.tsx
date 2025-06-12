'use client'
import React, {useState} from 'react';
import {Button, Input, Skeleton} from "@/components/ui";
import {Search} from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';
import {IMovieResponse} from "@/types/Movie";

const SearchMovie = () => {

    const [search_value, setSearch_value] = useState<string>("")
    const [search_data, setSearch_data] = useState<IMovieResponse[] | null>(null)



    const searchHandler = async () => {
        setSearch_data(null)
    }

    return (
        <div className={`flex gap-2 items-center justify-center w-full`}>
            <Input value={search_value} onChange={(e) => setSearch_value(e.target.value)} placeholder={`Looking for movie`} />
            <Drawer >
                <DrawerTrigger asChild>
                    <Button onClick={searchHandler}><Search className={`font-bold`} /></Button>
                </DrawerTrigger>
                <DrawerContent className="">
                    <div className="mx-auto w-full">
                        <DrawerHeader>
                            <DrawerTitle>Search Result</DrawerTitle>
                            <DrawerDescription>For you value: </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 h-fit pb-0">
                            {!search_data
                                ? <Skeleton className={`w-full md:min-w-[1200px] h-40`}></Skeleton>
                                : <h1>test</h1>
                            }
                        </div>
                        <DrawerFooter >
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default SearchMovie;