import React from 'react';
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import {ModeToggle} from "@/components/ModeToggle/ModeToggle";
import Image from "next/image";
import UserButton from "@/components/shared/user-button";
import UserObserve from "@/components/shared/user-observe";
import Link from "next/link";

interface Props {
    className?: string;
}

const Header: React.FC<Props> = ({className}) => {
    return (
        <>
            <UserObserve />

            <div id={`header`} className={cn(``, className)}>
                <Container className={`flex items-center justify-between py-8`}>

                    {/* Left side */}
                    <Link href={`/`} className={`flex items-center justify-center gap-4`}>
                        <div className="bg-neutral-50 w-auto rounded-2xl">
                            <Image width={25} height={25} src={'/logo.png'} alt={''}/>
                        </div>
                        <div>
                            <h1 className={`text-x md:text-2xl  uppercase font-black`}>Do do movies</h1>
                            <p className={`text-xs md:text-sm text-gray-400 leading-3`}>No way better</p>
                        </div>
                    </Link>

                    <div className={`flex items-center justify-center gap-4`}>
                        <UserButton/>
                        <ModeToggle/>
                    </div>
                </Container>
            </div>

        </>
    );
};

export default Header;