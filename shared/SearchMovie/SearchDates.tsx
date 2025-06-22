"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"

const generateYears = (start: number, end: number): number[] => {
    const years = []
    for (let y = end; y >= start; y--) {
        years.push(y)
    }
    return years
}

const YearRangePicker: React.FC = () => {
    const currentYear = new Date().getFullYear()
    const years = generateYears(1950, currentYear)

    const [fromYear, setFromYear] = React.useState<number | undefined>(2000)
    const [toYear, setToYear] = React.useState<number | undefined>(2025)

    React.useEffect(() => {
        const from = localStorage.getItem("fromYear")
        const to = localStorage.getItem("toYear")

        if (from) setFromYear(Number(from))
        if (to) setToYear(Number(to))
    }, [])

    // Обновляем localStorage при выборе
    const handleYearChange = (
        setter: React.Dispatch<React.SetStateAction<number | undefined>>,
        key: "fromYear" | "toYear",
        value: number
    ) => {
        setter(value)
        localStorage.setItem(key, String(value))
    }

    const renderYearSelector = (
        selectedYear: number | undefined,
        setYear: React.Dispatch<React.SetStateAction<number | undefined>>,
        label: string,
        key: "fromYear" | "toYear"
    ) => (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[150px] justify-between"
                >
                    {selectedYear ?? label}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] max-h-[300px] overflow-y-auto p-2">
                <ul className="space-y-1">
                    {years.map(year => (
                        <li key={year}>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => handleYearChange(setYear, key, year)}
                            >
                                {year}
                            </Button>
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    )

    return (
        <div className="flex flex-col gap-4 ">
            <h2 className="text-lg font-semibold">Select release year range</h2>
            <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">From year</span>
                    {renderYearSelector(fromYear, setFromYear, "Select from", "fromYear")}
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">To year</span>
                    {renderYearSelector(toYear, setToYear, "Select to", "toYear")}
                </div>
            </div>
            <div className="text-sm text-muted-foreground">
                Selected: {fromYear ?? "—"} → {toYear ?? "—"}
            </div>
        </div>
    )
}

export default YearRangePicker
