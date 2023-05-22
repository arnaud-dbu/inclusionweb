import { H2 } from "@/components/Headings";
import Image from "next/image";
import React from "react";
import searchIcon from "@/public/icons/search.svg";
import DivisionLine from "@/components/DivisionLine";
import WebCard from "@/components/WebCard";
import { BtnLarge } from "@/components/Buttons";
import Header from "@/components/Header";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

const DashboardPage = async () => {
    const res = await fetch("http://localhost:3000/api/webs", {
        cache: "no-cache",
    });
    const data = await res.json();

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (!user) {
        console.log("No user found");
    } else {
        console.log("user found");
    }

    return (
        <>
            <Header title="Mijn overzicht" />
            <div className="layout-wrapper flex justify-between gap-16">
                <div className="mt-8 w-full">
                    <div className="flex justify-between items-center gap-12 mb-8">
                        <H2>Mijn Webben</H2>
                        <DivisionLine />
                        <div className="form-input relative w-[40rem]">
                            <svg
                                className="w-6 fill-neutral-900 absolute right-4 top-1/2 -translate-y-1/2 opacity-30"
                                xmlns="http://www.w3.org/2000/svg"
                                width="52"
                                height="52"
                                fill="#ffffff"
                                viewBox="0 0 256 256"
                            >
                                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                            </svg>
                            <input placeholder="Zoek" />
                        </div>
                    </div>
                    <div>
                        {data.map((web: any) => {
                            return <WebCard key={web.id} data={web} />;
                        })}
                    </div>
                </div>
                <div className="flex gap-y-8 flex-wrap justify-between items-start w-[60rem] h-fit mt-8">
                    <BtnLarge
                        className="bg-secondary-800"
                        href="/new"
                        label="Nieuw Web"
                    >
                        <svg
                            className="opacity-60"
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="85"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                        >
                            <path
                                d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                                opacity="0.2"
                            ></path>
                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                        </svg>
                    </BtnLarge>
                    <BtnLarge
                        className="bg-neutral-700"
                        href="/"
                        label="Instellingen"
                    >
                        <svg
                            className="opacity-60"
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="85"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                        >
                            <path
                                d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                                opacity="0.2"
                            ></path>
                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                        </svg>
                    </BtnLarge>
                    <BtnLarge className="bg-neutral-900" label="Afmelden">
                        <svg
                            className="opacity-60"
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="85"
                            fill="#ffffff"
                            viewBox="0 0 256 256"
                        >
                            <path
                                d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
                                opacity="0.2"
                            ></path>
                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                        </svg>
                    </BtnLarge>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
