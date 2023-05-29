import { LoupeIcon } from "@/public/icons";
import React from "react";

type Props = {};

export const SearchInput = (props: Props) => {
	return (
		<div className={`relative mb-3`}>
			<LoupeIcon
				className={`absolute right-3 w-6 top-1/2 -translate-y-1/2 fill-primary-800 opacity-70`}
			/>
			<input
				className={`bg-transparent w-full border-2 px-4 py-2 rounded-lg border-neutral-500`}
				type="text"
				placeholder="Zoek"
			/>
		</div>
	);
};
