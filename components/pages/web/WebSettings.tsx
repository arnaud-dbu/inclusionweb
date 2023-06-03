import { useForm } from "react-hook-form";
import { BlockTitle } from "@/components/form/BlockTitle";
import CheckButton from "@/components/form/CheckButton";
import { IconButton } from "@/components/form/IconButton";
import { NonVisibleIcon, PlusIcon, ShareIcon, VisibleIcon } from "@/public/icons";
import { useContext, useState } from "react";
import { WebContext } from "@/context/WebContext";
import { Button } from "@/components/form/Button";
import DropdownVersion from "@/components/pages/web/VersionDropdown";
import { useRouter } from "next/navigation";
import Form from "@/components/form/Form";

export const WebSettings = () => {
	const {
		namesVisible,
		setNamesVisible,
		avatarSize,
		setAvatarSize,
		session,
		fetchedWebData,
		fetchedSessionsData,
		setContacts,
		fetchedContactsData,
	} = useContext(WebContext);
	const router = useRouter();

	const [selectedOption, setSelectedOption] = useState(null);

	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		await router.push(`/web/${fetchedWebData.id}/${selectedOption.value}`);
		setContacts(fetchedContactsData);
	};

	const handleNewSession = async () => {
		const latestSession = fetchedSessionsData.sort((a, b) => b.session - a.session)[0].session;

		try {
			const response = await fetch("/api/sessions", {
				method: "POST",
				body: JSON.stringify({
					id: crypto.randomUUID(),
					session: latestSession + 1,
					web_id: fetchedWebData.id,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 201) {
				router.push(`/web/${fetchedWebData.id}/${latestSession + 1}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section
			className={`flex gap-4 items-center absolute z-50 left-1/2 pt-12 -translate-x-1/2 top-0 w-[70rem]`}>
			<div className={`flex gap-12 items-center`}>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="!mb-0" title="Afbeeldingen" />
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
					<BlockTitle className="!mb-0" title="Namen" />
					<button className={``} onClick={() => setNamesVisible(!namesVisible)}>
						{namesVisible ? (
							<VisibleIcon className={`fill-primary-700`} />
						) : (
							<NonVisibleIcon className={`fill-primary-700`} />
						)}
					</button>
				</div>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="!mb-0" title="Versie" />
					<Form register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}>
						<DropdownVersion
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
							className={`w-[10rem]`}
							name="session"
							register={register}
							placeholder={session.toString()}
							options={fetchedSessionsData.map((session) => ({
								value: session.session,
								label: session.session.toString(),
							}))}
						/>
						<Button style="outline">Lets go</Button>
					</Form>
					<IconButton onClick={handleNewSession}>
						<PlusIcon className={`w-5 h-5`} />
					</IconButton>
				</div>
			</div>
			<div className={`ml-auto flex items-center gap-4`}></div>
			<Button style="secondary" label="Deel" icon={<ShareIcon className={`w-5 h-6`} />} />
		</section>
	);
};
