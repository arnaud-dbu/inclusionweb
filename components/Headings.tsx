import React from 'react'

type Props = {
    children: string
}

const H1 = ({ children } : Props) => {
    return (
        <h1 className='text-7xl font-primary font-bold uppercase text-neutral-900 mb-6'>{children}</h1>
    )
}

export default H1