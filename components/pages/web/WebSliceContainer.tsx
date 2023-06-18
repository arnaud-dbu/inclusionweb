import {
	Buurt,
	Familie,
	Hulpverlening,
	LevensBeschouwing,
	Onderwijs,
	Online,
	Vrienden,
	Vrij,
	Werk,
	Wonen,
} from "@/public/web-titles";

type LineProps = {
	className?: any;
	rotation: any;
};
type SliceProps = {
	name: React.ReactNode;
	distance: any;
	rotation: any;
};

const WebSliceContainer = () => {
	const topClass = `w-[21rem] rotate-[270deg]`;
	const bottomClass = `w-[22rem] rotate-[90deg]`;

	const slices = [
		{ name: <Werk className={topClass} />, rotation: 18, distance: 11.3 },
		{ name: <Vrienden className={topClass} />, rotation: 54, distance: 11.3 },
		{ name: <Familie className={topClass} />, rotation: 90, distance: 11.3 },
		{ name: <Onderwijs className={topClass} />, rotation: 126, distance: 11.3 },
		{ name: <Vrij className={topClass} />, rotation: 162, distance: 11.3 },
		{ name: <Buurt className={bottomClass} />, rotation: 198, distance: 11.8 },
		{ name: <Wonen className={bottomClass} />, rotation: 234, distance: 11.8 },
		{ name: <Hulpverlening className={bottomClass} />, rotation: 270, distance: 11.8 },
		{ name: <LevensBeschouwing className={bottomClass} />, rotation: 306, distance: 11.8 },
		{ name: <Online className={bottomClass} />, rotation: 342, distance: 12 },
	];

	return (
		<div>
			{slices.map((slice) => (
				<div key={slice.rotation}>
					<WebDivisionLine rotation={{ transform: `rotate(${slice.rotation + 18}deg)` }} />
					<WebSliceNaming
						name={slice.name}
						distance={{ left: `-${slice.distance}rem` }}
						rotation={{ transform: `rotate(${slice.rotation}deg)` }}
					/>
				</div>
			))}
		</div>
	);
};

const WebDivisionLine = ({ className, rotation }: LineProps) => {
	return (
		<div
			className={`absolute left-0 top-1/2 w-1/2 origin-right -translate-y-1/2 border-[1.25px] border-primary-300  ${className}`}
			style={rotation}></div>
	);
};

const WebSliceNaming = ({ name, distance, rotation }: SliceProps) => {
	return (
		<div
			className={`border-red absolute left-0 top-1/2 w-1/2 origin-right -translate-y-1/2 border-0`}
			style={rotation}>
			<div className="relative">
				<span
					className={`absolute top-1/2 -translate-y-1/2 text-lg text-neutral-800`}
					style={distance}>
					{name}
				</span>
			</div>
		</div>
	);
};

export default WebSliceContainer;
