import React from 'react';
import GitHubButton from "@/components/shared/SignIn/GitHubButton";
import GoogleButton from "@/components/shared/SignIn/GoogleButton";

const SignButtonGroup = () => {
    return (
        <div>
            <p className={`text-neutral-500 text-xs`}>You could also sign in by other services: </p>
            <div className={`grid grid-cols-2 gap-1 mt-2`}>
                <GitHubButton />
                <GoogleButton />
            </div>
        </div>
    );
};

export default SignButtonGroup;