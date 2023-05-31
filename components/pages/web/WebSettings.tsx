import { BlockTitle } from "@/components/form/BlockTitle";
import CheckButton from "@/components/form/CheckButton";
import { IconButton } from "@/components/form/IconButton";
import { NonVisibleIcon, PlusIcon, ShareIcon, VisibleIcon } from "@/public/icons";
import { useContext } from "react";
import { WebContext } from "@/context/WebContext";
import { Button } from "@/components/form/Button";
import DropdownVersion from "@/components/pages/web/VersionDropdown";

type Props = {};

export const WebSettings = (props: Props) => {
	const { namesVisible, setNamesVisible, avatarSize, setAvatarSize } = useContext(WebContext);

	return (
		<section
			className={`flex gap-4 items-center absolute z-50 left-1/2 pt-12 -translate-x-1/2 top-0 w-[70rem]`}>
			<div className={`flex gap-12 items-center`}>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="mb-0" title="Afbeeldingen" />
					<CheckButton
						onClick={() => setAvatarSize("small")}
						active={avatarSize === "small"}
						label="Klein"
					/>
					<CheckButton
						onClick={() => setAvatarSize("large")}
						active={avatarSize === "large"}
						label="Groot"
					/>
				</div>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="mb-0" title="Namen" />
					<button className={``} onClick={() => setNamesVisible(!namesVisible)}>
						{namesVisible ? (
							<VisibleIcon className={`fill-primary-700`} />
						) : (
							<NonVisibleIcon className={`fill-primary-700`} />
						)}
					</button>
				</div>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="mb-0" title="Versie" />
					<DropdownVersion
						className={`w-[10rem]`}
						name="avatar_size"
						placeholder="12/04/2024"
						options={[
							{ value: "large", label: "Versie 1" },
							{ value: "middel", label: "Versie 2" },
							{ value: "small", label: "Versie 3" },
						]}
					/>
					<IconButton>
						<PlusIcon className={`w-5 h-5`} />
					</IconButton>
				</div>
			</div>
			<div className={`ml-auto flex items-center gap-4`}></div>
			<Button style="secondary" label="Deel" icon={<ShareIcon className={`w-5 h-6`} />} />
		</section>
	);
};
