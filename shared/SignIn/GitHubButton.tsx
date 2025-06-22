'use client'

import React from 'react';
import { signIn } from "next-auth/react";
import {Github} from "lucide-react";
import { Button } from "@/components/ui";
import { useSearchParam } from "react-use";

const GitHubButton = () => {
    const callbackUrl = useSearchParam("callbackUrl") || "/";

    return (
        <Button className={`flex items-center gap-2 justify-center`} onClick={() => signIn('github', { callbackUrl })} variant="outline">
            <Github />
            <span>Git Hub</span>
        </Button>
    );
};

export default GitHubButton;
