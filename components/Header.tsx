import { HeadingPrimary } from "./Typography";

type Props = {
	title: string;
};

const Header = ({ title }: Props) => {
	return (
		<header className="pt-12 pb-4 h-[12rem] bg-primary-200 shadow-lg mb-[2.5rem]">
			<div className="layout-wrapper">
				<HeadingPrimary underline title={title} />
			</div>
		</header>
	);
};

export default Header;
