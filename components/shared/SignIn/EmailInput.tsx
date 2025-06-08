import React from 'react';
import {Input} from "@/components/ui";

interface Props {
    email_value: string;
    setEmail_value: (value: string) => void;
    setErrors_array: React.Dispatch<React.SetStateAction<string[]>>;
}


const EmailInput: React.FC<Props> = ({email_value, setEmail_value, setErrors_array}) => {

    const onEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail_value(value);

        const operators = [
            "@gmail.com", "@icloud.com", "@yahoo.com", "@hotmail.com", "@outlook.com",
            "@live.com", "@aol.com", "@msn.com", "@protonmail.com", "@mail.com",
            "@yandex.ru", "@yandex.com", "@zoho.com", "@gmx.com", "@inbox.ru",
            "@bk.ru", "@list.ru", "@rambler.ru", "@tutanota.com", "@me.com"
        ];

        const hasValidDomain = operators.some(domain => value.endsWith(domain));

        if (!hasValidDomain) {
            setErrors_array(prev => [...new Set([...prev, 'Uncorrected domain for mail'])]);
            return;
        } else {
            setErrors_array(prev => [...prev.filter(item => item !== 'Uncorrected domain for mail')]);
        }
    };

    return (
        <Input
            name='email'
            placeholder="email"
            value={email_value}
            onChange={onEmailChange}
            type="email"
        />
    );
};

export default EmailInput;
