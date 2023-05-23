import { Controller } from 'react-hook-form';

type Props = {
  label: string;
};

const Checkbox = ({ label }: Props) => {
  return (
    <div className={`flex gap-2 items-center`}>
      <input type="checkbox" />
      <label className="text-neutral-900" htmlFor="">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
