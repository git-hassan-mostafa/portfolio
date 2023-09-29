import React from 'react'

interface ProgressCirculeProps {
    radius: number 
    percentage: number 
    borderWidth: number 
    bottomCirculeColor: string 
    topCirculeColor: string 
    textColor:string 
    fontSize:number
    className?:string
}

export default function ProgressCircule(props:ProgressCirculeProps) {
    return (
        <div className={props.className}>
        <svg width={props.radius*2+props.borderWidth} height={props.radius*2+props.borderWidth} xmlns="http://www.w3.org/2000/svg">
            <circle
                cx={props.radius+props.borderWidth/2}
                cy={props.radius+props.borderWidth/2}
                r={props.radius}
                fill="none"
                stroke={props.bottomCirculeColor}
                strokeWidth={props.borderWidth}
            />
            <circle
                cx={props.radius+props.borderWidth/2}
                cy={props.radius+props.borderWidth/2}
                r={props.radius}
                fill="none"
                stroke={props.topCirculeColor}
                strokeWidth={props.borderWidth}
                strokeDasharray={(2 * Math.PI * (props?.radius as number))}
                strokeDashoffset={(1-(props.percentage as number)/100) * (2 * Math.PI * (props?.radius as number))}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={props.fontSize?.toString()}
                fill={props.textColor}
            >
                {props.percentage}%
            </text>
        </svg>
        </div>

    )
}
