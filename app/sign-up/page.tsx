'use client'

import React, {useState} from 'react';
import {Container} from "@/components/shared/container";
import {Button, Checkbox, Input} from "@/components/ui";
import {LoaderCircle} from "lucide-react";
import ErrorsList from "@/components/ui/sign-up/ErrorsList";
import {createNewUser} from "@/utils/createNewUser";
import SignButtonGroup from "@/components/shared/SignIn/SignButtonGroup";
import EmailInput from "@/components/shared/SignUp/EmailInput";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors_array, setErrors_array] = useState<string[]>([]);

    const [email_value, setEmail_value] = useState<string>('');
    const [password_value, setPassword_value] = useState<string>('');
    const [password_check_value, setPassword_check_value] = useState<string>('');

    const handleSubmit = async () => {
        const newErrors: string[] = [];

        setIsLoading(true);

        if (!email_value.includes('@')) {
            newErrors.push('Invalid email format.');
        }

        if (password_value.length < 6) {
            newErrors.push('Password must be at least 6 characters.');
        }

        if (password_value !== password_check_value) {
            newErrors.push('Passwords do not match.');
        }

        if (!email_value || !password_value || !password_check_value) {
            newErrors.push('All fields must be filled.');
        }

        setErrors_array(newErrors);

        if (newErrors.length === 0) {
            const data = {
                email: email_value,
                password: password_value,
            }

            const user_result = await createNewUser(data)

            if (user_result) {
                setEmail_value('')
                setPassword_value('')
                setPassword_check_value('')
                setErrors_array([])
                router.push('/sign-in')
            }
        }

        setTimeout(() => setIsLoading(false), 250);
    };


    return (
        <Container>
            <div className="max-w-md mx-auto mt-10 p-6  shadow-xl rounded-2xl space-y-6">
                <h1 className="text-2xl font-semibold text-center">Create your new account</h1>

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
                        placeholder={`Password`}
                        type={`password`}
                    />

                    <Input
                        value={password_check_value}
                        onChange={(e) => setPassword_check_value(e.currentTarget.value)}
                        placeholder={`Check password`}
                        type={`password`}
                    />

                    <div className="flex items-start gap-3 mt-2">
                        <Checkbox id="terms-2" defaultChecked/>

                        <div className="grid gap-2">
                            <Label htmlFor="terms-2">Accept terms and conditions</Label>
                            <p className="text-neutral-500 text-xs">
                                By clicking this checkbox, you agree to the terms and conditions.
                            </p>
                        </div>
                    </div>

                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading && <LoaderCircle className={`animate-spin`}/>}
                        Sign In
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    Return back?{" "}
                    <Link href="/sign-in" className="text-primary hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Page;
