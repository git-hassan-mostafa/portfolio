import React from 'react'
import { SVGProps } from './Check'

export default function Hamburger({size,color,className,onclick}:SVGProps) {
    return (
        <svg onClick={onclick} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={color} width={size} height={size}>
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
    )
}
