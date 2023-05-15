import { H2 } from '@/components/Headings'
import Image from 'next/image'
import React from 'react'
import searchIcon from '@/public/icons/search.svg'
import DivisionLine from '@/components/DivisionLine'
import WebCard from '@/components/WebCard'

type Props = {}

const DashboardPage = (props: Props) => {
    return (
        <>
            <div className="layout-wrapper">
                <div className='w-1/2 mt-8'>
                    <div className='flex justify-between items-center gap-12'>
                        <H2>Mijn Webben</H2>
                        <DivisionLine />
                        <div className="form-input relative w-[40rem]">
                            <svg className='w-6 fill-neutral-900 absolute right-4 top-1/2 -translate-y-1/2 opacity-30' xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="#ffffff" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                            <input placeholder="Zoek" />
                        </div>
                    </div>
                    <div>
                        <WebCard />
                        <WebCard />
                        <WebCard />
                        <WebCard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage