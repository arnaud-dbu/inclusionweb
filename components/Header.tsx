import { H1 } from './Headings';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <header className="pt-12 pb-4 bg-primary-200 shadow-lg">
      <div className="layout-wrapper">
        <H1 underline>{title}</H1>
      </div>
    </header>
  );
};

export default Header;
