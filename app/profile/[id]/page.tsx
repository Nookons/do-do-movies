'use client'
import { Container } from '@/components/shared/container';
import React from 'react';
import {Avatar, Skeleton} from "@/components/ui";
import {useSession} from "next-auth/react";
import {AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface UserPageProps {
    params: Promise<{ id: string }>;
}

const Page = ({params}: UserPageProps) => {
    const {id} = React.use(params);
    const session = useSession();


    if (!id) {
        return (
            <Container>
                <Skeleton className={`w-full h-20`} />
            </Container>
        )
    }

    return (
        <Container>
            <div className={`flex justify-center items-start gap-4`}>
                <Avatar>
                    <AvatarImage src={session.data?.user?.image || ""} alt="User Profile Image" />
                    <AvatarFallback>DM</AvatarFallback>
                </Avatar>
                <div>
                    <h2>Email: {session.data?.user?.email}</h2>
                    <h2>Name: {session.data?.user?.name}</h2>
                </div>
            </div>
        </Container>
    );
};

export default Page;