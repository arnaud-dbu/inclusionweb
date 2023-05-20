import React from "react";

type Props = {
    className: string;
};

const WebDivisionLine = ({ className }: Props) => {
    return (
        <div
            className={`border-[1.25px] ${className} origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2`}
        ></div>
    );
};

export default WebDivisionLine;
