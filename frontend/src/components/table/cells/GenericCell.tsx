import type { ReactNode } from 'react'

type GenericCellProps = {
    value: unknown
}

export const GenericCell = ({ value }: GenericCellProps) => {
    function formatValue(value: unknown): string {
        if (value === null || value === undefined) return "—"
        if (typeof value === "boolean") return value ? "True" : "False"
        if (typeof value === "number") return value.toLocaleString()
        if (value instanceof Date) return value.toISOString()

        return String(value)
    }

    return <div>{formatValue(value)}</div>
}