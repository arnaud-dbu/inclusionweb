import AvatarComponent from "@/components/avatar/AvatarComponent";
import WebDivisionLine from "@/components/web/WebDivisionLine";
import WebSliceNaming from "@/components/web/WebSliceNaming";
import Image from "next/image";
import { DndContext } from "@dnd-kit/core";
import { DragContact } from "./DragContact";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { DropZone } from "./DropZone";
import { useContext } from "react";
import { WebContext } from "@/context/WebContext";
import { WebSettings } from "../(websettings)/WebSettings";

const Web = () => {
	const { contacts, setContacts, fetchedWebData } = useContext(WebContext);

	const handleDragEnd = (ev) => {
		const dragItemId = ev.active.id;
		const newPositionedDragItems = contacts?.map((item) => {
			if (item.id === dragItemId) {
				const newX = parseFloat(item.position.x) + ev.delta.x;
				const newY = parseFloat(item.position.y) + ev.delta.y;

				const x = parseFloat(newX.toFixed());
				const y = parseFloat(newY.toFixed());

				return {
					...item,
					position: {
						x: x,
						y: y,
					},
				};
			}
			return item;
		});
		setContacts(newPositionedDragItems);
	};

	return (
		<>
			<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
				<div className="w-[70%] h-screen absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
					<WebSettings />
					<div className={`web w-[60rem]`}>
						<DropZone>
							{contacts?.map((contact) => (
								<DragContact
									styles={{
										position: "absolute",
										left: `${contact.position.x}px`,
										top: `${contact.position.y}px`,
									}}
									key={contact.id}
									id={contact.id}
									name={contact.name}
									avatar={contact.avatar}
									visible={contact.visible ? "block" : "none"}
								/>
							))}
							<div className="web-inner z-20 opacity-10 scale-[1.04]"></div>
							<div className="web-inner opacity-20 scale-[.95]"></div>
							<div className="web-inner opacity-20 scale-[.75]"></div>
							<div className="web-inner opacity-20 scale-[.55]"></div>
							<div className="web-inner opacity-25 scale-[.35]"></div>

							{fetchedWebData.image_path && (
								<Image
									className="absolute-center z-50 w-[10rem] rounded-full aspect-square object-cover"
									alt="test"
									src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${fetchedWebData.image_path}`}
									width={700}
									height={700}
								/>
							)}
							{fetchedWebData.avatar && (
								<AvatarComponent
									avatar={fetchedWebData.avatar}
									className="absolute-center w-[10rem] z-50 h-[10rem] bg-primary-500 mb-2 rounded-full object-cover"
								/>
							)}

							<WebDivisionLine className="rotate-[0deg]" />
							<WebSliceNaming name="Wonen" className="rotate-[20deg]" />
							<WebDivisionLine className="rotate-[40deg]" />
							<WebSliceNaming name="Hulpverlening, diensten" className="rotate-[60deg]" />
							<WebDivisionLine className="rotate-[80deg]" />
							<WebSliceNaming name="Buurt, gemeenschap" className="rotate-[100deg]" />
							<WebDivisionLine className="rotate-[120deg]" />
							<WebSliceNaming name="Familie" className="rotate-[140deg]" />
							<WebDivisionLine className="rotate-[160deg]" />
							<WebSliceNaming name="Onderwijs" className="rotate-[180deg]" />
							<WebDivisionLine className="rotate-[200deg]" />
							<WebSliceNaming name="Onderwijs" className="rotate-[220deg]" />
							<WebDivisionLine className="rotate-[240deg]" />
							<WebSliceNaming name="Vrije tijd" className="rotate-[260deg]" />
							<WebDivisionLine className="rotate-[280deg]" />
							<WebSliceNaming name="Levensbeschouwing" className="rotate-[300deg]" />
							<WebDivisionLine className="rotate-[320deg]" />
							<WebSliceNaming name="Internet" className="rotate-[340deg]" />
						</DropZone>
					</div>
				</div>
			</DndContext>
		</>
	);
};

export default Web;
