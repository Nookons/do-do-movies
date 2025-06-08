'use client'

import React from 'react';
import { signIn } from "next-auth/react";
import { Youtube } from "lucide-react";
import { Button } from "@/components/ui";
import { useSearchParam } from "react-use";

const GoogleButton = () => {
    const callbackUrl = useSearchParam("callbackUrl") || "/";

    return (
        <Button className={`flex items-center gap-2 justify-center`}  onClick={() => signIn('google', { callbackUrl })} variant="outline">
            <Youtube/>
            <span>Google</span>
        </Button>
    );
};

export default GoogleButton;
