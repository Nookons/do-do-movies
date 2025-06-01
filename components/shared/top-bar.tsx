import React from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import Categories from "@/components/shared/categories";
import {Button, Popover, PopoverContent, PopoverTrigger } from '../ui';
import {Columns2, Columns3, Columns4, PanelsTopLeft} from "lucide-react";

interface Props {
    className?: string;
}

const TopBar: React.FC<Props> = ({className}) => {

    return (
        <div className={cn(`sticky top-0 backdrop-blur py-5 shadow-lg shadow-black/5 z-10`, className)}>
            <Container className={`flex justify-between items-center gap-2`}>
                <Categories />

                <div className={`hidden md:block`}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <PanelsTopLeft />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">Set up</h4>
                                    <p className="text-muted-foreground text-sm">
                                        How many movies in one row you want?
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant={'outline'}><Columns2 size={24} /></Button>
                                    <Button variant={'outline'}><Columns3 size={24} /></Button>
                                    <Button variant={'outline'}><Columns4 size={24} /></Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </Container>
        </div>
    );
};

export default TopBar;