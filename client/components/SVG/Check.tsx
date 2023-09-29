import React from 'react'

export  interface SVGProps {
  size: string,
  color: string,
  className?: string
  onclick?:()=>void
}

export default function Check({ size, color, className }: SVGProps) {
  return (
    <svg className={className} fill={color} xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size}>
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>
  )
}
