import WebDivisionLine from "@/components/web/WebDivisionLine";
import WebSliceNaming from "@/components/web/WebSliceNaming";
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
import React from "react";

const WebSliceContainer = () => {
	const topClass = `w-[21rem] rotate-[270deg]`;
	const bottomClass = `w-[22rem] rotate-[90deg]`;

	const slices = [
		{ name: <Werk className={topClass} />, rotation: 18, distance: 20 },
		{ name: <Vrienden className={topClass} />, rotation: 54, distance: 10 },
		{ name: <Familie className={topClass} />, rotation: 90, distance: 10 },
		{ name: <Onderwijs className={topClass} />, rotation: 126, distance: 10 },
		{ name: <Vrij className={topClass} />, rotation: 162, distance: 10 },
		{ name: <Buurt className={bottomClass} />, rotation: 198, distance: 10.3 },
		{ name: <Wonen className={bottomClass} />, rotation: 234, distance: 10.3 },
		{ name: <Hulpverlening className={bottomClass} />, rotation: 270, distance: 10.3 },
		{ name: <LevensBeschouwing className={bottomClass} />, rotation: 306, distance: 10.3 },
		{ name: <Online className={bottomClass} />, rotation: 342, distance: 10.6 },
	];

	const slicesList = slices.map((slice) => (
		<>
			<WebDivisionLine className={`rotate-[${slice.rotation + 18}deg]`} />
			<WebSliceNaming
				name={slice.name}
				distance={slice.distance}
				className={`rotate-[${slice.rotation}deg]`}
			/>
		</>
	));

	return <>{slicesList}</>;
};

export default WebSliceContainer;
