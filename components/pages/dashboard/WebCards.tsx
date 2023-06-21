"use client";

import { WebContext } from "@/context/WebContext";
import { useContext, useRef } from "react";
import { Button } from "@/components/form/Button";
import OverFlowContainer from "@/components/OverFlowContainer";
import { useRouter } from "next/navigation";
import { useHover } from "usehooks-ts";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";
import { NeighborIllustration } from "@/public/illustrations";
import { PlusIcon, TrashIcon } from "@/public/icons";
import { IconButton } from "@/components/form/IconButton";
import { set } from "react-hook-form";

const WebCards = () => {
	const router = useRouter();
	const { searchFilter, webs, setWebs, sessions, setIsLoading, loading, fetchedSessionsData } =
		useContext(WebContext);

	// Filter webs on search input and sort them by last created
	const searchFilteredWebs = searchFilter(webs);
	const sortedWebs = searchFilteredWebs.sort((a, b) => {
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});

	const handleOpenSingleWeb = async (id: string) => {
		setIsLoading(true);

		// // Get all sessions with this web id and redirect to the last used session
		// const sessionsWithId = await sessions.filter((session: any) => session.web_id == id);

		// // Order sessions by session number
		// const orderSessions = await sessionsWithId.sort((a: any, b: any) => b.session - a.session);
		// // Get last session number
		// const lastUsedSession = await orderSessions[0]?.session;

		try {
			// Update last used session
			const response = await fetch(`/api/webs/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					last_opened: new Date().toISOString(),
				}),
			});

			// Redirect to last used session
			if (response.status == 201) {
				router.push(`web/${id}/1`);
				setIsLoading(false);
			}

			const web = webs.find((web: any) => web.id == id);
			const newWeb = {
				...web,
				last_opened: new Date().toISOString(),
			};
			const newWebs = webs.filter((web: any) => web.id !== id);
			setWebs([newWeb, ...newWebs]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteSingleWeb = async (id: string) => {
		const newWebs = webs.filter((web: any) => web.id !== id);
		setWebs(newWebs);

		try {
			await fetch(`/api/webs/${id}`, {
				method: "DELETE",
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<OverFlowContainer fadeBottom>
				<section className={`pb-16`}>
					{sortedWebs.length == 0 ? (
						<div className="flex h-[calc(100vh-25rem)] flex-col items-center justify-center">
							<div className={`relative w-[50%] lg:w-[20vw]`}>
								<Image src={NeighborIllustration} width={500} height={500} alt="buurt afbeelding" />
								<div className={`absolute -right-12 top-5 flex w-[10rem] flex-col 2xl:-right-5`}>
									<span className="mb-3 text-xl font-semibold text-neutral-800 opacity-50 3xl:text-3xl">
										Geen webben gevonden
									</span>
								</div>
							</div>
						</div>
					) : (
						sortedWebs.map((web: any) => (
							<WebCard
								key={web.id}
								web={web}
								handleOpenSingleWeb={handleOpenSingleWeb}
								handleDeleteSingleWeb={handleDeleteSingleWeb}
								loading={loading}
							/>
						))
					)}
				</section>
			</OverFlowContainer>
			<Button
				style="primary"
				icon={<PlusIcon className={`h-12 w-12`} />}
				onClick={() => router.push("/new")}
				className={`!fixed bottom-8 right-8 !h-16 w-16 !px-4 !py-7 !shadow-xxl md:right-16 xl:hidden`}
			/>
		</>
	);
};

const WebCard = ({ web, handleOpenSingleWeb, handleDeleteSingleWeb, loading }) => {
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	return (
		<article
			key={web?.id}
			ref={hoverRef}
			className="mb-4 flex flex-col items-center justify-between rounded-3xl border-1 border-neutral-500 bg-white px-20 py-8 text-neutral-800 shadow-sm md:flex-row md:px-12">
			{/* WebCard Details */}
			<div className="flex w-full flex-col md:justify-between">
				<div className="my-4 flex flex-col md:my-0 md:mb-10">
					<span className="mb-1 text-center text-2xl md:text-start ">Inclusieweb</span>
					<span className="text-center font-primary text-5xl font-semibold uppercase text-neutral-900 md:text-start ">
						{web?.name}
					</span>
				</div>
				<div className="flex items-center gap-2 self-center md:self-start">
					<Button
						onClick={() => handleOpenSingleWeb(web?.id)}
						label="Open"
						style="tertiary"
						loading={loading}
						className={`mt-2 md:mt-0`}
						size="sm"
					/>
					<IconButton
						className={`absolute right-5 top-5 md:static ${
							isHover ? "opacity-1" : "lg:opacity-0"
						} h-6 w-6 transition-opacity`}
						onClick={() => handleDeleteSingleWeb(web?.id)}
						icon={
							<TrashIcon
								className={`h-6 w-6 fill-neutral-500 transition-colors hover:fill-red-900 `}
							/>
						}
					/>
				</div>
			</div>
			{/* WebCard Thumbnail */}
			<div className={`web -order-1 h-[9rem] w-[9rem] md:order-1 2xl:h-[10rem] 2xl:w-[10rem] `}>
				<div
					className={`web-inner opacity-20 ${
						isHover ? "scale-[1] opacity-0 shadow-lg" : ""
					}`}></div>
				<div
					className={`web-inner scale-[.75] opacity-20 transition-transform ${
						isHover ? "scale-[1]" : ""
					}`}></div>
				<div
					className={`web-inner scale-[.5] opacity-20 transition-transform ${
						isHover ? "scale-[1]" : ""
					}`}></div>
				<div
					className={`web-inner scale-[.25] opacity-20 transition-transform ${
						isHover ? "scale-[1]" : ""
					}`}></div>
				<div
					className={`absolute-center  h-[9rem] w-[9rem] transition 2xl:h-[10rem] 2xl:w-[10rem] ${
						isHover ? "opacity-1 scale-[1] delay-[.06s]" : "scale-0 opacity-0"
					}`}>
					{web?.avatar ? (
						<AvatarComponent
							className=" h-[9rem] w-[9rem] shadow-lg 2xl:h-[10rem] 2xl:w-[10rem]"
							avatar={web.avatar}
						/>
					) : (
						<Image
							src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${web?.image_path}`}
							width={300}
							height={300}
							alt="Profile picture"
							className="aspect-square rounded-full object-cover shadow-lg"
						/>
					)}
				</div>
			</div>
		</article>
	);
};

export default WebCards;
