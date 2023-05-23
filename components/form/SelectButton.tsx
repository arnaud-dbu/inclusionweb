import React from "react";

type Props = {
    type: string;
    setType: any;
    register: any;
    names: string[];
    labels: string[];
    icons: any[];
};

const SelectButtons = ({ register, type, names, labels, icons, setType }: Props) => {

    return (
        <div className="flex gap-2 w-full">
            {
                names.map((name, i) => (
                    <button onClick={() => setType(name)} key={name} {...register(name)}
                        className={`border-[1.5px] border-neutral-500 flex flex-col items-center rounded-lg py-2 px-4 ${type === name && "bg-primary-700 border-none shadow-lg"}`}>
                        {icons[i]}
                        <span className={`text-neutral-900 text-sm ${type === name && "text-white font-bold"}`}>
                            {labels[i]}
                        </span>
                    </button>
                ))
            }
        </div>
    );
};

export default SelectButtons;
