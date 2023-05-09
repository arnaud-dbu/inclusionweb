type Props = {
    text: string;
}

const DivisionLine = ({ text }: Props) => {
    return (
        <div className="relative h-px w-full bg-neutral-500 my-5">
            <span className="absolute-center bg-primary-300 px-3">{text}</span>
        </div>
    )
}

export default DivisionLine