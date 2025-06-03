'use client'

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {getUserObserver} from "@/utils/getUserFromServer";
import {useUserStore} from "@/store/user";

const UserObserve = () => {
    const session = useSession();
    const setUserStore = useUserStore(state => state.setUserData);

    useEffect(() => {
        let unsubscribe: (() => void) | null = null;

        if (session.status === "authenticated") {
            const email = session.data?.user?.email;

            if (email) {
                unsubscribe = getUserObserver(email, (user) => {
                    if (user) {
                        console.log(user)
                        setUserStore(user);
                    }
                });
            }
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [session, setUserStore]);


    return null
};

export default UserObserve;