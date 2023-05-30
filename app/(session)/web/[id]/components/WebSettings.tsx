import { BlockTitle } from "@/components/form/BlockTitle";
import CheckButton from "@/components/form/CheckButton";
import { CheckButtonGroup } from "@/components/form/CheckButtonGroup";
import { Dropdown } from "@/components/form/Dropdown";
import { IconButton } from "@/components/form/IconButton";
import useToggle from "@/hooks/useToggle";
import { ShareIcon } from "@/public/icons";
import React, { useContext } from "react";
import Web from "./Web";
import { WebContext } from "@/context/WebContext";

type Props = {};

export const WebSettings = (props: Props) => {
	const [value, toggle, setValue] = useToggle();
	const { setAvatarSize } = useContext(WebContext);

	const handleAvatarSize = () => {
		setValue((x) => !x);
		setAvatarSize(value ? "large" : "small");
	};

	return (
		<div
			className={`flex gap-4 items-center absolute left-1/2 pt-12 -translate-x-1/2 top-0 w-[70rem]`}>
			<div className={`flex gap-2 items-center mr-4`}>
				<BlockTitle className="mb-0" title="Afbeeldingen" />
				<CheckButton onClick={handleAvatarSize} active={value} label="Klein" />
				<CheckButton onClick={handleAvatarSize} active={!value} label="Groot" />
			</div>
			<div className={`flex gap-2 items-center`}>
				<BlockTitle className="mb-0" title="Namen Zichtbaar" />
			</div>
			<Dropdown
				className={`w-[12.5rem]`}
				name="avatar_size"
				placeholder="Sessies"
				options={[
					{ value: "large", label: "Groot" },
					{ value: "middel", label: "Middelmatig" },
					{ value: "small", label: "Klein" },
				]}
			/>
			<IconButton>
				<ShareIcon className={`w-7 h-7`} />
			</IconButton>
		</div>
	);
};
