'use client'
import React, {useEffect} from 'react';
import {CircleUser, LogOut, MoveRight, User} from "lucide-react";
import {Button, Skeleton} from "@/components/ui";
import {useSession, signOut} from "next-auth/react";
import Link from "next/link";
import {userSignIn} from "@/utils/userSignIn";
import {getUserId} from "@/utils/getUserId";
import { useRouter } from 'next/navigation';

const UserButton = () => {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        const test = async () => {
            if (session.data) {
                await userSignIn(session.data)
            }
        }
        test()
    }, [session]);

    const onProfileHandle = async () => {
        if (session?.data?.user?.email) {
            const result = await getUserId(session.data.user.email)
            if (result) {
                router.push(`/profile/${result}`);
            }
        }
    }

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
                    <Button onClick={onProfileHandle} variant={"secondary"}><CircleUser size={24}/></Button>
                    <Button onClick={() => signOut({callbackUrl: "/"})} variant={"secondary"}><LogOut
                        size={24}/></Button>
                </div>
            }
        </>
    );
};

export default UserButton;