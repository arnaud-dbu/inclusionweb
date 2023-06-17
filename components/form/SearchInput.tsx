import { WebContext } from "@/context/WebContext";
import { CrossIcon, LoupeIcon } from "@/public/icons";
import React, { useContext } from "react";

type Props = {
	className?: string;
	inputStyle?: string;
};

export const SearchInput = ({ className, inputStyle }: Props) => {
	const { setQuery, setInputValue, inputValue, handleInputChange } = useContext(WebContext);

	return (
		<div className={`relative ${className}`}>
			{inputValue ? (
				<button>
					<CrossIcon
						className={`absolute right-3 top-1/2 w-6 -translate-y-1/2 fill-primary-800 opacity-70`}
						onClick={() => {
							setInputValue("");
							setQuery("");
						}}
					/>
				</button>
			) : (
				<button>
					<LoupeIcon
						className={`absolute right-3 top-1/2 w-6 -translate-y-1/2 fill-primary-800 opacity-70`}
					/>
				</button>
			)}
			<input
				className={`focus w-full min-w-[15rem] ${inputStyle} rounded-lg border-1 border-neutral-500 bg-transparent px-4 py-2  outline-none`}
				type="text"
				placeholder="Zoek"
				value={inputValue}
				onChange={handleInputChange}
			/>
		</div>
	);
};
