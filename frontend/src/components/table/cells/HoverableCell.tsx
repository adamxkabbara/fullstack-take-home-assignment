import { useEffect, useRef, useState } from 'react'
import { GenericCell } from './GenericCell'

type HoverableCellProps = {
    value: unknown,
    children?: React.ReactNode
}

export const HoverableCell = ({ value, children }: HoverableCellProps) => {
    const [hovered, setHovered] = useState(false)

    const handleMouseEnter = () => {
        setHovered(true)
        
    }
    const handleMouseLeave = () => setHovered(false)

    return (
        <div
            className='relative cursor-default inline-block'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <GenericCell value={value} />
            {hovered && children && (
                <div className='hoverable-cell-action absolute bg-white z-20 w-md'
                    style={{
                        overflowY: 'auto',
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    )
}