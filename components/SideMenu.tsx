import Image from 'next/image'
import React from 'react'
import resokitIcon from '@/public/icons/resokit-icon.svg'
import settingsIcon from '@/public/icons/settings.svg'
import mapIcon from '@/public/icons/map.svg'
import houseIcon from '@/public/icons/house.svg'
import Link from 'next/link'

type Props = {}

const SideMenu = (props: Props) => {
    return (
        <aside className="bg-primary-700 fixed left-0 top-0 h-full px-4 py-6 flex flex-col items-center">
            <Link href="/">
                <Image src={resokitIcon} alt="Logo" width={60} height={60} />
            </Link>

            <nav className='relative top-1/2 -translate-y-1/2'>
                <ul className='flex flex-col gap-8'>
                    <li>
                        <Link href="#">
                            <Image className='opacity-70' src={houseIcon} alt="house icon" width={45} height={45} />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Image className='opacity-70' src={mapIcon} alt="map icon" width={45} height={45} />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Image className='opacity-70' src={settingsIcon} alt="settings icon" width={45} height={45} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default SideMenu