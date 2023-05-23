'use client';

type Props = {
    register?: any;
    buttons: string[];
    name: string;
}

export const CheckButtonGroup = ({
    register,
    name,
    buttons,
    ...rest
}: Props) => {
    return (
        <div className="flex gap-2" {...register(name)} {...rest}>
            {buttons.map((label) => (
                <button key={label} value={label} className="border-1 border-neutral-500 h-fit whitespace-nowrap text-neutral-800 rounded-lg px-3 py-1">{label}</button>
            ))}
        </div>
    );
};
