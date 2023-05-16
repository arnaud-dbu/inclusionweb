"use client"

import Form from '@/components/form/Form'
import { H1 } from '@/components/Headings'
import Input from '@/components/form/Input'
import Web from '@/components/Web'
import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import { useSupabase } from '@/app/supabase-provider'
import Image from 'next/image'

type Props = {
}




const NewWebPage = ({ }: Props) => {
    const { supabase } = useSupabase();
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState<any>('')


    const onSubmit = async (data: any) => {
        const avatarFile = data.picture[0]
        const userId = (await supabase.auth.getUser()).data.user.id

        const { data: image } = await supabase
            .storage
            .from('uploads')
            .upload(userId + '/' + uuidv4(), avatarFile)

            setImage(image)




        // const { data, error } = await supabase
        //     .storage
        //     .from('avatars')
        //     .upload('public/avatar1.png', avatarFile, {
        //         cacheControl: '3600',
        //         upsert: false
        //     })

        // await fetch("/api/webs", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         name: data.name,
        //         user_id: (await supabase.auth.getUser()).data.user.id
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
    };


    return (
        <div className=''>
            <div className='flex items-center w-full justify-center gap-28 absolute top-1/2 -translate-y-1/2'>
                <div className='w-[20rem]'>
                    <H1 underline>Start een nieuw web</H1>
                    <Form
                        btnLabel="Start"
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        className="w-full"
                    >
                        <Input register={register} type="file" name="picture" spacing="my-4" />
                        <Input register={register} name="name" label="Naam" spacing="my-4" />
                        <Link href="/" className={` w-[47.5%]  text-neutral-800 border-[1.5px] border-neutral-500 flex flex-col gap-2 justify-center px-5 py-5 rounded-2xl`}>
                            <svg className='opacity-80' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0c566d" viewBox="0 0 256 256"><path d="M176,211.16Zm-96,0ZM224,128A96,96,0,1,0,80,211.16V176L128,72l48,104v35.16A96,96,0,0,0,224,128Z" opacity="0.2"></path><path d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM88,192a16,16,0,0,1,32,0v23.59a88,88,0,0,1-32-9.22Zm48,0a16,16,0,0,1,32,0v14.37a88,88,0,0,1-32,9.22Zm-28.73-56h41.46l11.58,25.1A31.93,31.93,0,0,0,128,170.87a31.93,31.93,0,0,0-32.31-9.77Zm7.39-16L128,91.09,141.34,120Zm75.56,70.23c-2,2-4.08,3.87-6.22,5.64V176a7.91,7.91,0,0,0-.74-3.35l-48-104a8,8,0,0,0-14.52,0l-48,104A7.91,7.91,0,0,0,72,176v19.87c-2.14-1.77-4.22-3.64-6.22-5.64a88,88,0,1,1,124.44,0Z"></path></svg>
                            <span className="text-neutral-800 font-medium">Ontwerp je avatar</span>
                        </Link>
                        <Link href="/" className={` w-[47.5%] text-neutral-800 border-[1.5px] border-neutral-500 flex flex-col gap-2 justify-center px-5 py-5 rounded-2xl`}>
                            <svg className='opacity-80' xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#0c566d" viewBox="0 0 256 256"><path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"></path><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path></svg>
                            <span className="text-neutral-800 font-medium">Upload een foto</span>
                        </Link>
                    </Form>
                </div>
                {
                    image &&
                    <Image alt="test" src={`https://acpvrarbefctkcejmfeo.supabase.co/storage/v1/object/public/uploads/${image.path}`} width={30} height={30} />
                }

                {/* <Web className='w-[50rem]' /> */}
            </div>
        </div>
    )
}

export default NewWebPage