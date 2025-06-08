'use client'

import React, {FormEventHandler, useState} from 'react';
import {Container} from "@/components/shared/container";
import EmailInput from "@/components/shared/SignIn/EmailInput";
import SignButtonGroup from "@/components/shared/SignIn/SignButtonGroup";
import Link from "next/link";
import {Button, Input} from "@/components/ui";
import {LoaderCircle} from "lucide-react";
import ErrorsList from "@/components/ui/sign-up/ErrorsList";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

const Page = () => {
    const router = useRouter();
    const [errors_array, setErrors_array] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [email_value, setEmail_value] = useState<string>("");
    const [password_value, setPassword_value] = useState<string>("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const result = await signIn('credentials', {
            email: email_value,
            password: password_value,
            redirect: false,
        })

        if (result && !result.error) {
            router.push('/')
        } else {
            setErrors_array(result?.error ? [result.error] : []);
        }

        setIsLoading(false);
    };

    return (
        <Container>
            <div className="max-w-md mx-auto mt-10 p-6  shadow-xl rounded-2xl space-y-6">
                <h1 className="text-2xl font-semibold text-center">Sign in to your account</h1>

                <SignButtonGroup/>
                {errors_array.length > 0 && <ErrorsList errors={errors_array}/>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <EmailInput
                        email_value={email_value}
                        setEmail_value={setEmail_value}
                        setErrors_array={setErrors_array}
                    />

                    <Input
                        value={password_value}
                        onChange={(e) => setPassword_value(e.currentTarget.value)}
                        placeholder={`password`}
                        type={`password`}
                    />

                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading && <LoaderCircle className={`animate-spin`}/>}
                        Sign In
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <Link href="/sign-up" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Page;
