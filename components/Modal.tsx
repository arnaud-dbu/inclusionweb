"use client";

import React, { useState } from "react";
import { H1 } from "./Headings";

type Props = {};

const Modal = (props: Props) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);

    return (
        modalIsVisible && (
            <dialog open className="w-[50rem] h-[50rem] absolute-center z-50">
                <H1>Maak een contact</H1>
                {/* <form method="dialog">
                    <button>OK</button>
                </form> */}
            </dialog>
        )
    );
};

export default Modal;
