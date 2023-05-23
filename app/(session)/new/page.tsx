'use client';

import Form from '@/components/form/Form';
import { H1 } from '@/components/Headings';
import { Input } from '@/components/form/Input';
import Web from '@/components/Web';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSupabase } from '@/app/supabase-provider';
import AvatarStyle from '@/components/avatar/AvatarStyle';
import { useRouter } from 'next/navigation';
import {
    ClothesIcon,
    EditIcon,
    EyeBrowIcon,
    EyeIcon,
    FacialHairIcon,
    GlassesIcon,
    HairColorIcon,
    HairIcon,
    ImageIcon,
    MouthIcon,
    SkinColorIcon,
} from '@/public/icons';

type Props = {};

const NewWebPage = ({ }: Props) => {
    const router = useRouter();
    const { supabase } = useSupabase();
    const { register, handleSubmit } = useForm();
    const [selectedImage, setSelectedImage] = useState<any>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [avatarStyleVisible, setAvatarStyleVisible] = useState<boolean>(true);
    const [mainMenuVisible, setMainMenuVisible] = useState<boolean>(false);
    const [showOnWeb, setShowOnWeb] = useState<string>('default');

    const [topType, setTopType] = useState<string[]>([
        'LongHairStraight',
        'NoHair',
        'Hijab',
        'LongHairDreads',
    ]);
    const [accesoiresType, setAccesoiresType] = useState<string[]>([
        'Blank',
        'Round',
        'Sunglasses',
        'Wayfarers',
    ]);
    const [hairColor, setHairColor] = useState<string[]>([
        'Blonde',
        'Black',
        'Red',
    ]);
    const [facialHair, setFacialHair] = useState<string[]>([
        'Blank',
        'BeardLight',
        'BeardMedium',
    ]);
    const [clothes, setClothes] = useState<string[]>([
        'BlazerShirt',
        'Overall',
        'Hoodie',
    ]);
    const [eyes, setEyes] = useState<string[]>(['Default', 'Close', 'Cry']);
    const [eyebrow, setEyebrow] = useState<string[]>([
        'Default',
        'DefaultNatural',
        'Angry',
    ]);
    const [mouth, setMouth] = useState<string[]>(['Default', 'Eating', 'Sad']);
    const [skinColor, setSkinColor] = useState<string[]>([
        'Light',
        'Tanned',
        'Yellow',
        'Pale',
        'Brown',
        'Black',
        'DarkBrown',
    ]);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const onSubmit = async (data: any) => {
        const userId = (await supabase.auth.getUser()).data.user.id;
        const id = crypto.randomUUID();

        if (data.picture[0]) {
            try {
                // Upload image
                const { data: image } = await supabase.storage
                    .from('uploads')
                    .upload(userId + '/' + crypto.randomUUID(), data.picture[0]);

                // Insert data into the database
                const response = await fetch('/api/webs', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: id,
                        name: data.name,
                        user_id: (await supabase.auth.getUser()).data.user.id,
                        image_path: image.path,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                response.status === 201 && router.push(`/web/${id}`);
            } catch (error) {
                console.log(error);
            }
        } else {
            const response = await fetch('/api/webs', {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    name: data.name,
                    user_id: (await supabase.auth.getUser()).data.user.id,
                    avatar: JSON.stringify({
                        topType: topType[0],
                        accessoriesType: accesoiresType[0],
                        hairColor: hairColor[0],
                        facialHairType: facialHair[0],
                        clotheType: clothes[0],
                        eyeType: eyes[0],
                        eyebrowType: eyebrow[0],
                        mouthType: mouth[0],
                        skinColor: skinColor[0],
                    }),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            response.status === 201 && router.push(`/web/${id}`);
        }
    };

    const handleUIToggle = () => {
        setAvatarStyleVisible(!avatarStyleVisible);
        setMainMenuVisible(!mainMenuVisible);
    };

    const handleItem = (item, dir) => {
        const currentIndex = item.indexOf(item.find((type) => type === item[0]));
        let newItem = [];

        if (dir === '>') {
            newItem = [
                ...item.slice(currentIndex + 1),
                ...item.slice(0, currentIndex + 1),
            ];
        } else {
            newItem = [
                ...item.slice(currentIndex - 1),
                ...item.slice(0, currentIndex - 1),
            ];
        }

        switch (item) {
            case topType:
                setTopType(newItem);
                break;
            case skinColor:
                setSkinColor(newItem);
                break;
            case accesoiresType:
                setAccesoiresType(newItem);
                break;
            case hairColor:
                setHairColor(newItem);
                break;
            case facialHair:
                setFacialHair(newItem);
                break;
            case clothes:
                setClothes(newItem);
                break;
            case eyes:
                setEyes(newItem);
                break;
            case eyebrow:
                setEyebrow(newItem);
                break;
            case mouth:
                setMouth(newItem);
                break;
        }
    };

    return (
        <div className="flex items-center w-full justify-center gap-28 absolute top-1/2 -translate-y-1/2">
            <div className={`w-[20rem] ${mainMenuVisible && 'hidden'}`}>
                <H1 className="mb-10" underline>
                    Start een nieuw web
                </H1>
                <Form
                    btnLabel="Start"
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    className={`w-full`}
                >
                    <Input register={register} name="name" label="Naam" spacing="my-4" />
                    <div
                        onClick={() => {
                            handleUIToggle();
                            setShowOnWeb('avatar');
                        }}
                        className={`cursor-pointer w-[47.5%]  text-neutral-800 border-[1.5px] border-neutral-500 flex flex-col gap-2 justify-center px-5 py-5 rounded-2xl`}
                    >
                        <EditIcon className="opacity-80" />

                        <span className="text-start text-neutral-800 font-medium">
                            Ontwerp je avatar
                        </span>
                    </div>
                    <div
                        className={`cursor-pointer relative w-[47.5%] text-neutral-800 border-[1.5px] border-neutral-500 flex flex-col gap-2 justify-center px-5 py-5 rounded-2xl`}
                    >
                        <ImageIcon className="opacity-80" />
                        <span className="text-start text-neutral-800 font-medium">
                            Upload een foto
                        </span>
                        <input
                            {...register('picture')}
                            onChange={(e) => {
                                setSelectedImage(e.target.files[0]);
                                setShowOnWeb('image');
                            }}
                            className="cursor-pointer absolute w-full h-full left-0 opacity-0"
                            type="file"
                            name="picture"
                            accept="image/*"
                        />
                    </div>
                </Form>
            </div>
            <div className={` ${avatarStyleVisible && 'hidden'}`}>
                <div onClick={handleUIToggle}>
                    <svg
                        className="cursor-pointer fill-neutral-700"
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="#030303"
                        viewBox="0 0 256 256"
                    >
                        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                    </svg>
                </div>
                <H1 className="mb-2" underline>
                    Mijn avatar
                </H1>
                <ul className="flex flex-col gap-4">
                    <AvatarStyle
                        name="Huidskleur"
                        prevBtn={() => handleItem(skinColor, '<')}
                        nextBtn={() => handleItem(skinColor, '>')}
                    >
                        <SkinColorIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Haar"
                        prevBtn={() => handleItem(topType, '<')}
                        nextBtn={() => handleItem(topType, '>')}
                    >
                        <HairIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Ogen"
                        prevBtn={() => handleItem(eyes, '<')}
                        nextBtn={() => handleItem(eyes, '>')}
                    >
                        <EyeIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Mond"
                        prevBtn={() => handleItem(mouth, '<')}
                        nextBtn={() => handleItem(mouth, '>')}
                    >
                        <MouthIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Wenkbrauwen"
                        prevBtn={() => handleItem(eyebrow, '<')}
                        nextBtn={() => handleItem(eyebrow, '>')}
                    >
                        <EyeBrowIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Kleding"
                        prevBtn={() => handleItem(clothes, '<')}
                        nextBtn={() => handleItem(clothes, '>')}
                    >
                        <ClothesIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Haar Kleur"
                        prevBtn={() => handleItem(hairColor, '<')}
                        nextBtn={() => handleItem(hairColor, '>')}
                    >
                        <HairColorIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Bril"
                        prevBtn={() => handleItem(accesoiresType, '<')}
                        nextBtn={() => handleItem(accesoiresType, '>')}
                    >
                        <GlassesIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                    <AvatarStyle
                        name="Baardgroei"
                        prevBtn={() => handleItem(facialHair, '<')}
                        nextBtn={() => handleItem(facialHair, '>')}
                    >
                        <FacialHairIcon className="fill-neutral-900 mr-5" />
                    </AvatarStyle>
                </ul>
            </div>

            <Web
                image={imageUrl}
                className="w-[50rem]"
                showOnWeb={showOnWeb}
                topType={topType[0]}
                skinColor={skinColor[0]}
                accessoriesType={accesoiresType[0]}
                hairColor={hairColor[0]}
                facialHairType={facialHair[0]}
                clotheType={clothes[0]}
                eyeType={eyes[0]}
                eyebrowType={eyebrow[0]}
                mouthType={mouth[0]}
            />
        </div>
    );
};

export default NewWebPage;
