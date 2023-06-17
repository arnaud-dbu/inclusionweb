import { HeadingPrimary } from "./Typography";

type Props = {
	title: string;
};

const Header = ({ title }: Props) => {
	return (
		<header className=" relative mt-20 pb-1 pt-4 xl:mb-[2.5rem] xl:mt-0 xl:h-[12rem] xl:bg-primary-200 xl:pb-4 xl:pt-12 xl:shadow-lg">
			<div className="layout-wrapper">
				<HeadingPrimary className={`px-2 xl:px-2`} underline title={title} />
			</div>
		</header>
	);
};

export default Header;
