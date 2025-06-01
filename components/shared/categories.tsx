'use client'
import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {useCategoryStore} from "@/store/category";
import {Button} from "@/components/ui";
import Link from "next/link";
import { SquareArrowUp } from 'lucide-react';
import UserButton from "@/components/shared/user-button";
import {ModeToggle} from "@/components/ModeToggle/ModeToggle";

interface Props {
    className?: string;
}

const cats = [
    'Now Playing',
    'Popular',
    'Top Rated',
];

const Categories: React.FC<Props> = ({className}) => {
    const active_type = useCategoryStore(state => state.activeCategory)
    const [refactored_type, setRefactored_type] = useState<string>('Now Playing')

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
        if (active_type) {
            switch (active_type) {
                case 'now_playing':
                    setRefactored_type('Now Playing')
                    return;
                case 'popular':
                    setRefactored_type('Popular')
                    return;
                case 'top_rated':
                    setRefactored_type('Top Rated')
                    return;
                default:
                    setRefactored_type('Now Playing')
                    return;
            }
        }
    }, [active_type]);

    return (
        <div className={`flex gap-4 items-center`}>
            {scrollY > 100 &&
                <Link href={`/#header`}>
                    <Button><SquareArrowUp /></Button>
                </Link>
            }
            {scrollY > 100 &&
                <div className={`hidden md:block`}>
                    <ModeToggle />
                </div>
            }
            <div className={cn(`flex items-center bg-neutral-100 dark:bg-neutral-900 gap-1 p-1 rounded-2xl`, className)}>
                {
                    cats.map((cat, index) => (
                        <a key={`${index}-${cat}`} href={`/#${cat.toLowerCase().replace(" ", "_")}`}
                           className={cn('flex items-center font-bold h-10 rounded-2xl px-5', refactored_type === cat && 'bg-neutral-200 dark:bg-neutral-800 text-primary')}>
                            <button>
                                <b className={`text-xs`}>{cat}</b>
                            </button>
                        </a>
                    ))
                }
                {scrollY > 100 &&
                        <UserButton />
                }
            </div>
        </div>
    );
};

export default Categories;