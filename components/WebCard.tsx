import { Btn } from "./Buttons";
import Web from "../app/(session)/new/components/WebIllustration";
import { H1 } from "./Headings";

type Props = {
	data: any;
};

const WebCard = ({ data }: Props) => {
	return (
		<article className="bg-white flex justify-between rounded-3xl px-12 py-10 text-neutral-800 border-[3px] border-neutral-500 mb-4">
			<div className="flex flex-col justify-between">
				<div className="flex flex-col">
					<span className="text-2xl">Inclusieweb</span>
					<span className="font-primary uppercase text-neutral-900 font-extrabold text-5xl">
						{data.name}
					</span>
				</div>
				<div className="flex gap-3">
					<Btn tertiary href={`web/${data.id}/1`} className="w-fit">
						Open
					</Btn>
					<Btn secondary>Deel</Btn>
				</div>
			</div>
			<Web className="w-[12rem] opacity-80" />
		</article>
	);
};

export default WebCard;
