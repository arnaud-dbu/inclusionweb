import Circle from "@/components/Chart";
import Header from "@/components/Header";
import React from "react";

type Props = {};

const AboutPage = (props: Props) => {
	return (
		<>
			<Header title="Over Resokit" />
			<div className={`absolute-center w-[50rem] h-[50rem]`}>
				<Circle />
			</div>
		</>
	);
};

export default AboutPage;
