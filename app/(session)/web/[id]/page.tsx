import { Btn } from '@/components/Buttons'
import DivisionLine from '@/components/DivisionLine'
import addUserIcon from '@/public/icons/add-user.svg'

type Props = {}

const WebPage = ({ params }) => {

    return (
        <>
            <aside className="bg-primary-200 flex flex-col shadow-lg absolute left-24 w-[25%] h-full px-16 pt-12">
                <div className="flex flex-col">
                    <img className='w-24' src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' />
                    <span className="text-3xl text-neutral-800">Netwerk</span>
                    <span className="font-primary uppercase text-6xl font-bold text-neutral-900">Annelies Jacobs</span>
                </div>
                <div className="form-input relative my-6">
                    <svg className='w-6 fill-neutral-900 absolute right-4 top-1/2 -translate-y-1/2 opacity-30' xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="#ffffff" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                    <input placeholder="Zoek" />
                </div>
                <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center'>
                        <button className='bg-primary-400 text-primary-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap'>Niet geplaatst</button>
                        <button className='text-neutral-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap'>Geplaatst</button>
                    </div>
                    <DivisionLine />
                    <div className='flex items-center gap-2 ml-4'>
                        <button>
                            <svg className="fill-neutral-600" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                        </button>
                        <button>
                            <svg className="fill-neutral-600" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 256 256"><path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path></svg>
                        </button>
                    </div>
                </div>

                <Btn className='w-full mt-auto mb-8' primary submit imgSrc={addUserIcon}>Nieuw</Btn>
            </aside>
            <div className='w-[70%] absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center'>
                <div className={`web w-[65rem]`}>
                    <div className="web-inner opacity-20"></div>
                    <div className="web-inner opacity-20 scale-[.8]"></div>
                    <div className="web-inner opacity-25 scale-[.6]"></div>
                    <div className="web-inner opacity-30 scale-[.4]"></div>
                    <div className="web-inner opacity-30 scale-[.2]"></div>
                </div>
            </div>
        </>
    )
}

export default WebPage