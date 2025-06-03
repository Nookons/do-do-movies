'use client'
import React from 'react';
import {CircleUser, LogOut, MoveRight, User} from "lucide-react";
import {Button, Skeleton} from "@/components/ui";
import {useSession, signOut} from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {useUserStore} from "@/store/user";

const UserButton = () => {
    const router = useRouter();
    const session = useSession();
    const user_store = useUserStore(state => state.data)

    if (session.status === 'loading') {
        return <Skeleton className={`w-[150px] h-10`}/>;
    }

    return (
        <>
            {!session.data
                ?
                <Link href={`/api/auth/signin`}>
                    <Button className={`flex cursor-pointer group relative items-center justify-center`}>
                        <User size={12}/>
                        <span className={`h-full w-[1px] bg-white/30 mx-1`}/>
                        <b className={`group-hover:opacity-0 text-xs md:text-sm transition`}>Sign In</b>
                        <MoveRight size={16}
                                   className={`group-hover:opacity-100 opacity-0 absolute -translate-x-2 group-hover:translate-x-5 transition duration-300`}/>
                    </Button>
                </Link>
                :
                <div className={`flex items-center gap-2`}>
                    <Button onClick={() => router.push(`/profile/${user_store?.id}`)} variant={"secondary"}><CircleUser size={24}/></Button>
                    <Button onClick={() => signOut({callbackUrl: "/"})} variant={"secondary"}><LogOut
                        size={24}/></Button>
                </div>
            }
        </>
    );
};

export default UserButton;