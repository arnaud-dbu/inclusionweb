"use client";

import { Btn } from "@/components/Buttons";
import DivisionLine from "@/components/DivisionLine";
import { AddUserIcon, GridIcon, ListIcon, SearchIcon } from "@/public/icons";
import Avatar from "avataaars";

type Props = {};

const WebPage = ({ params }) => {
    return (
        <>
            <aside className="bg-primary-200 flex flex-col shadow-lg absolute left-24 w-[25%] h-full px-16 pt-12">
                <div className="flex flex-col">
                    <Avatar
                        className="w-24 h-24 bg-primary-500 rounded-full object-cover"
                        avatarStyle=""
                        topType="LongHairStraight"
                        accessoriesType="Blank"
                        hairColor="BrownDark"
                        facialHairType="Blank"
                        clotheType="BlazerShirt"
                        eyeType="Default"
                        eyebrowType="Default"
                        mouthType="Default"
                        skinColor="Light"
                    />
                    <span className="text-3xl text-neutral-800">Netwerk</span>
                    <span className="font-primary uppercase text-6xl font-bold text-neutral-900">
                        Annelies Jacobs
                    </span>
                </div>
                <div className="form-input relative my-6">
                    <SearchIcon className="w-6 fill-neutral-900 absolute right-4 top-1/2 -translate-y-1/2 opacity-30" />
                    <input placeholder="Zoek" />
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center">
                        <button className="bg-primary-400 text-primary-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap">
                            Niet geplaatst
                        </button>
                        <button className="text-neutral-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap">
                            Geplaatst
                        </button>
                    </div>
                    <DivisionLine />
                    <div className="flex items-center gap-2 ml-4">
                        <button>
                            <ListIcon className="fill-neutral-600 w-8" />
                        </button>
                        <button>
                            <GridIcon className="fill-neutral-600 w-8" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between gap-y-4 my-5">
                    <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
                        <Avatar
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
                            avatarStyle=""
                            topType="LongHairStraight"
                            accessoriesType="Blank"
                            hairColor="BrownDark"
                            facialHairType="Blank"
                            clotheType="BlazerShirt"
                            eyeType="Default"
                            eyebrowType="Default"
                            mouthType="Default"
                            skinColor="Light"
                        />
                        <span className="font-bold text-neutral-800 text-xl">
                            Jane Doe
                        </span>
                        <span className="text-neutral-800 font-light">
                            Babysit
                        </span>
                    </div>
                    <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
                        <Avatar
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
                            avatarStyle=""
                            topType="LongHairStraight"
                            accessoriesType="Blank"
                            hairColor="BrownDark"
                            facialHairType="Blank"
                            clotheType="BlazerShirt"
                            eyeType="Default"
                            eyebrowType="Default"
                            mouthType="Default"
                            skinColor="Light"
                        />
                        <span className="font-bold text-neutral-800 text-xl">
                            Jane Doe
                        </span>
                        <span className="text-neutral-800 font-light">
                            Babysit
                        </span>
                    </div>
                    <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
                        <Avatar
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
                            avatarStyle=""
                            topType="LongHairStraight"
                            accessoriesType="Blank"
                            hairColor="BrownDark"
                            facialHairType="Blank"
                            clotheType="BlazerShirt"
                            eyeType="Default"
                            eyebrowType="Default"
                            mouthType="Default"
                            skinColor="Light"
                        />
                        <span className="font-bold text-neutral-800 text-xl">
                            Jane Doe
                        </span>
                        <span className="text-neutral-800 font-light">
                            Babysit
                        </span>
                    </div>
                    <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
                        <Avatar
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
                            avatarStyle=""
                            topType="LongHairStraight"
                            accessoriesType="Blank"
                            hairColor="BrownDark"
                            facialHairType="Blank"
                            clotheType="BlazerShirt"
                            eyeType="Default"
                            eyebrowType="Default"
                            mouthType="Default"
                            skinColor="Light"
                        />
                        <span className="font-bold text-neutral-800 text-xl">
                            Jane Doe
                        </span>
                        <span className="text-neutral-800 font-light">
                            Babysit
                        </span>
                    </div>
                </div>

                <Btn className="w-full mt-auto mb-8" primary submit>
                    <AddUserIcon className="w-6 fill-white mr-2" />
                    Nieuw
                </Btn>
            </aside>
            <div className="w-[70%] absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className={`web w-[65rem]`}>
                    <div className="web-inner opacity-20 scale-[.95]"></div>
                    <div className="web-inner opacity-20 scale-[.75]"></div>
                    <div className="web-inner opacity-20 scale-[.55]"></div>
                    <div className="web-inner opacity-25 scale-[.35]"></div>
                    <Avatar
                        className="absolute-center w-[10rem] h-[10rem] bg-primary-500 mb-2 rounded-full object-cover z-10"
                        avatarStyle=""
                        topType="LongHairStraight"
                        accessoriesType="Blank"
                        hairColor="BrownDark"
                        facialHairType="Blank"
                        clotheType="BlazerShirt"
                        eyeType="Default"
                        eyebrowType="Default"
                        mouthType="Default"
                        skinColor="Light"
                    />

                    <div className="border-[1.25px] rotate-[0deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[0] rotate-[20deg] origin-right w-1/2 absolute left-0 top-1/2 -translate-y-1/2">
                        <div className="relative">
                            <span className="absolute w-[15rem] text-center -left-[8.5rem] -rotate-90 top-1/2 -translate-y-1/2 text-lg text-neutral-800">
                                Vrije tijd
                            </span>
                        </div>
                    </div>
                    <div className="border-[1.25px] rotate-[40deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[0] rotate-[60deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2">
                        <div className="relative">
                            <span className="absolute w-[15rem] -left-[8.5rem] -rotate-90 text-center top-1/2 -translate-y-1/2 text-lg text-neutral-800">
                                Ontspanningsmomenten
                            </span>
                        </div>
                    </div>
                    <div className="border-[1.25px] rotate-[80deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[1.25px] rotate-[120deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[1.25px] rotate-[160deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[1.25px] rotate-[200deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[1.25px] rotate-[240deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[1.25px] rotate-[280deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                    <div className="border-[1.25px] rotate-[320deg] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        </>
    );
};

export default WebPage;
