import { Btn } from "@/components/Buttons";
import DivisionLine from "@/components/DivisionLine";
import { H1 } from "@/components/Headings";
import Modal from "@/components/Modal";
import AvatarComponent from "@/components/avatar/Avatar";
import WebDivisionLine from "@/components/web/WebDivisionLine";
import WebSliceNaming from "@/components/web/WebSliceNaming";
import { AddUserIcon, GridIcon, ListIcon, SearchIcon } from "@/public/icons";
import Image from "next/image";
import { useState } from "react";

type Props = {};

const WebPage = async ({ params }) => {
    const res = await fetch(`http://localhost:3000/api/web/${params.id}`, {
        cache: "no-store",
    });
    const data = await res.json();

    return (
        <>
            <Modal />
            <aside className="bg-primary-200 flex flex-col shadow-lg absolute left-24 w-[25%] h-full px-16 pt-12">
                <div className="flex flex-col">
                    {data.image_path && (
                        <Image
                            className="rounded-full w-24 aspect-square object-cover"
                            alt="test"
                            src={`${process.env.SUPABASE_UPLOAD_URL}${data.image_path}`}
                            width={700}
                            height={700}
                        />
                    )}
                    {data.avatar && (
                        <AvatarComponent
                            data={data.avatar}
                            className="w-24 h-24 bg-primary-500 rounded-full object-cover"
                        />
                    )}

                    <span className="text-3xl text-neutral-800">Netwerk</span>
                    <span className="font-primary uppercase text-6xl font-bold text-neutral-900">
                        {data.name}
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
                        <AvatarComponent
                            data={data.avatar}
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
                        />
                        <span className="font-bold text-neutral-800 text-xl">
                            Jane Doe
                        </span>
                        <span className="text-neutral-800 font-light">
                            Babysit
                        </span>
                    </div>
                    <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
                        <AvatarComponent
                            data={data.avatar}
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
                        />

                        <span className="font-bold text-neutral-800 text-xl">
                            Jane Doe
                        </span>
                        <span className="text-neutral-800 font-light">
                            Babysit
                        </span>
                    </div>
                    <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
                        <AvatarComponent
                            data={data.avatar}
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
                        />

                        <span className="font-bold text-neutral-800 text-xl">
                            Jane Doe
                        </span>
                        <span className="text-neutral-800 font-light">
                            Babysit
                        </span>
                    </div>
                    <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
                        <AvatarComponent
                            data={data.avatar}
                            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
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
                <div className={`web w-[60rem]`}>
                    <div className="web-inner z-20 opacity-10 scale-[1.04]"></div>
                    <div className="web-inner opacity-20 scale-[.95]"></div>
                    <div className="web-inner opacity-20 scale-[.75]"></div>
                    <div className="web-inner opacity-20 scale-[.55]"></div>
                    <div className="web-inner opacity-25 scale-[.35]"></div>

                    <AvatarComponent
                        data={data.avatar}
                        className="absolute-center w-[10rem] z-50 h-[10rem] bg-primary-500 mb-2 rounded-full object-cover"
                    />
                    <WebDivisionLine className="rotate-[0deg]" />
                    <WebSliceNaming name="Wonen" className="rotate-[20deg]" />
                    <WebDivisionLine className="rotate-[40deg]" />
                    <WebSliceNaming
                        name="Hulpverlening, diensten"
                        className="rotate-[60deg]"
                    />
                    <WebDivisionLine className="rotate-[80deg]" />
                    <WebSliceNaming
                        name="Buurt, gemeenschap"
                        className="rotate-[100deg]"
                    />
                    <WebDivisionLine className="rotate-[120deg]" />
                    <WebSliceNaming
                        name="Familie"
                        className="rotate-[140deg]"
                    />
                    <WebDivisionLine className="rotate-[160deg]" />
                    <WebSliceNaming
                        name="Onderwijs"
                        className="rotate-[180deg]"
                    />
                    <WebDivisionLine className="rotate-[200deg]" />
                    <WebSliceNaming
                        name="Onderwijs"
                        className="rotate-[220deg]"
                    />
                    <WebDivisionLine className="rotate-[240deg]" />
                    <WebSliceNaming
                        name="Vrije tijd"
                        className="rotate-[260deg]"
                    />
                    <WebDivisionLine className="rotate-[280deg]" />
                    <WebSliceNaming
                        name="Levensbeschouwing"
                        className="rotate-[300deg]"
                    />
                    <WebDivisionLine className="rotate-[320deg]" />
                    <WebSliceNaming
                        name="Internet"
                        className="rotate-[340deg]"
                    />
                </div>
            </div>
        </>
    );
};

export default WebPage;
