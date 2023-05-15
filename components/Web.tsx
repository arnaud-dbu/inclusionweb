type Props = {
    className: string;
}

const Web = ({ className }: Props) => {
    return (
        <>
            <div className={`web ${className}`}>
                <div className="web-inner opacity-20"></div>
                <div className="web-inner opacity-20 scale-[.8]"></div>
                <div className="web-inner opacity-25 scale-[.6]"></div>
                <div className="web-inner opacity-30 scale-[.4]"></div>
                <div className="web-inner opacity-30 scale-[.2]"></div>
            </div>
        </>
    )
}

export default Web