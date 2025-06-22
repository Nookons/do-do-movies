import React from 'react';
import {Checkbox} from "@/components/ui";

export interface FilterCheckboxProps {
    text: string;
    value: string;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({text, value, endAdornment, onCheckedChange, checked, name,}) => {

    return (
        <div className="flex items-center group hover:bg-secondary/70 cursor-pointer p-2 rounded transition space-x-2">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="rounded-[6px] cursor-pointer w-6 h-6"
                id={`checkbox-${name}-${String(value)}`}
            />
            <label
                htmlFor={`checkbox-${name}-${String(value)}`}
                className="leading-none text-x cursor-pointer flex-1">
                {text}
            </label>
            {endAdornment}
        </div>
    );
};
