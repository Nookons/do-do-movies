'use client'
import {Container} from '@/components/shared/container';
import React from 'react';
import {Avatar, Button, Skeleton} from "@/components/ui";
import {useUserStore} from "@/store/user";
import {AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Title} from '@/components/shared/title';
import {Badge} from '@/components/ui/badge';
import {BadgeCheck, BadgeInfo, BookKey, Handshake, Headset, MessageSquareHeart, MoveRight} from 'lucide-react';
import Link from 'next/link';
import UserList from "@/components/shared/User/UserList";

const Page = () => {
    const store_user = useUserStore((state) => state.data)


    if (!store_user) {
        return (
            <Container className={`flex flex-col gap-4`}>
                <Skeleton className={`w-full h-40`}/>
                <Skeleton className={`w-full h-10`}/>
                <Skeleton className={`w-full h-25`}/>
            </Container>
        )
    }

    return (
        <Container>
            <Link href={`/`} className={`flex items-center gap-4`}>
                <div>
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={store_user.image} alt="@shadcn"/>
                        <AvatarFallback className="text-lg">CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <Title className={`font-bold`} size={'xs'} text={store_user.email}/>
                    <p className={`text-xs text-neutral-500 font-bold`}>UID: {store_user.id.slice(0, 10)}</p>
                </div>
            </Link>
            <div className={`mt-4 flex flex-wrap gap-2`}>
                <Badge className={`text-x`} variant={"secondary"}><BookKey size={28}/> Non-VIP</Badge>
                <Badge className={`text-x`} variant={"secondary"}><BadgeCheck
                    className={`text-green-500`}/> Verified</Badge>
            </div>

            <div className={`flex flex-col gap-4`}>
                <UserList type={'watch_later'} store_user={store_user} title={`You want watch this is later`} list={store_user.watch_later_list} />
                <UserList type={'favorite'} store_user={store_user} title={`Movies what you liked`} list={store_user.favorite_list} />
                <UserList type={'watched_list'} store_user={store_user} title={`You just watched this`} list={store_user.watched_list} />
            </div>

            <div className={`bg-secondary mt-4 rounded p-2`}>
                <Title text={`Customer Support`}/>

                <div className={`flex flex-col gap-4 mt-4`}>
                    <Button className={`flex justify-between items-center w-full `} variant={"secondary"}>
                        <div className={`flex items-center gap-2`}>
                            <Headset className={`text-primary`} size={28}/>
                            <p className={`font-bold`}>Help Center & Contact Support</p>
                        </div>
                        <MoveRight className={`text-neutral-500`} size={28}/>
                    </Button>
                    <Button className={`flex justify-between items-center w-full `} variant={"secondary"}>
                        <div className={`flex items-center gap-2`}>
                            <BadgeInfo size={28} className={`text-primary`}/>
                            <p className={`font-bold`}>About Us</p>
                        </div>
                        <MoveRight className={`text-neutral-500`} size={28}/>
                    </Button>
                    <Button className={`flex justify-between items-center w-full `} variant={"secondary"}>
                        <div className={`flex items-center gap-2`}>
                            <Handshake className={`text-primary`} size={28}/>
                            <p className={`font-bold`}>Rate Us</p>
                        </div>
                        <MoveRight className={`text-neutral-500`} size={28}/>
                    </Button>
                    <Button className={`flex justify-between items-center w-full `} variant={"secondary"}>
                        <div className={`flex items-center gap-2`}>
                            <MessageSquareHeart className={`text-primary`} size={28}/>
                            <p className={`font-bold`}>Join Our Community</p>
                        </div>
                        <MoveRight className={`text-neutral-500`} size={28}/>
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Page;