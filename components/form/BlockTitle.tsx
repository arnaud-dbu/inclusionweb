import React from 'react'

type Props = {
    title: string;
}

export const BlockTitle = ({ title }: Props) => {
    return (
        <span className="text-md font-semibold text-neutral-800 mb-3 block">{title}</span>
    )
}