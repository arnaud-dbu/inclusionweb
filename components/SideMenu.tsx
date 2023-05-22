"use client";

import React from "react";
import ResokitIcon from "@/public/icons/resokit-icon.svg";
import HouseIcon from "@/public/icons/house.svg";
import Link from "next/link";
import { MapIcon, SettingsIcon } from "@/public/icons";

type Props = {};

const SideMenu = (props: Props) => {
    return (
        <aside className="bg-primary-700 fixed left-0 top-0 h-full px-4 py-6 w-24 flex flex-col items-center">
            <Link href="/">
                <ResokitIcon />
            </Link>

            <nav className="relative top-1/2 -translate-y-1/2">
                <ul className="flex flex-col gap-8">
                    <li>
                        <Link href="/dashboard">
                            <HouseIcon className="opacity-70" />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <MapIcon className="opacity-70" />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <SettingsIcon className="opacity-70" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideMenu;
