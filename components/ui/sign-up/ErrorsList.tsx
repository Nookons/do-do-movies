import React from 'react';
import {AlertCircleIcon} from "lucide-react";
import {AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Alert} from "@/components/ui";

interface props {
    errors: string[];
}

const ErrorsList: React.FC<props> = (props) => {
    return (
        <Alert className={`mt-4`} variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to process</AlertTitle>
            <AlertDescription>
                <p>Please verify your information and try again.</p>
                <ul className="list-inside list-disc text-sm">
                    {props.errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    );
};

export default ErrorsList;