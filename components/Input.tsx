import Image from 'next/image'


type Props = {
    label: string,
    icon: 'string',
    alt: string,
    className?: string
}

const Input = ({ label, icon, alt, className }: Props) => {
    return (
        <div className={`relative ${className}`}>
            <label htmlFor="email" className='absolute left-3 top-1/2 -translate-y-1/2 opacity-50 text-neutral-900 font-normal'>{label}</label>
            <input
                className="h-12 w-full border-0  bg-neutral-400 px-4 rounded-lg"
                type="email"
            // placeholder="Email"
            // {...register('email')}
            />
            <Image
                src={icon}
                alt={alt}
                width={20}
                height={20}
                className='absolute right-4 top-1/2 -translate-y-1/2 opacity-30'
            />

        </div>
    )
}

export default Input