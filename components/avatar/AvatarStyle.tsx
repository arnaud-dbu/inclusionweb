'use client'

type Props = {
    children: React.ReactNode;
    name: string;
    prevBtn: () => void;
    nextBtn: () => void;
}

const AvatarStyle = ({ children, name, prevBtn, nextBtn }: Props) => {
    return (
        <li className='flex items-center'>
            { children }
            <span className='mr-12 font-primary uppercase font-bold text-2xl text-neutral-900'>{ name }</span>
            <div className='flex items-center ml-auto'>
                <button>
                    <svg onClick={prevBtn} className='opacity-40' width="40" height="40" fill="#0c566d" viewBox="0 0 256 256"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM149.66,93.66,115.31,128l34.35,34.34a8,8,0,0,1-11.32,11.32l-40-40a8,8,0,0,1,0-11.32l40-40a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
                <button>
                    <svg onClick={nextBtn} className='rotate-180 opacity-40' width="40" height="40" fill="#0c566d" viewBox="0 0 256 256"><path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM149.66,93.66,115.31,128l34.35,34.34a8,8,0,0,1-11.32,11.32l-40-40a8,8,0,0,1,0-11.32l40-40a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
            </div>
        </li>
    )
}

export default AvatarStyle