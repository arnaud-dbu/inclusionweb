"use client";

import { useForm } from "react-hook-form";
import { H1 } from "@/components/Headings";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import { Avatar } from "avataaars";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { Btn } from "@/components/Buttons";

type Props = {
    modalVisible: any;
    setModalVisible: any;
};

const Modal = ({ modalVisible, setModalVisible }: Props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const data = {
        topType: "Turban",
        accessoriesType: "Round",
        hairColor: "Blue",
        facialHairType: "Blank",
        clotheType: "BlazerShirt",
        eyeType: "Default",
        eyebrowType: "Default",
        mouthType: "Default",
        skinColor: "Light",
    };

    const jsonData = JSON.stringify(data);

    return (
        modalVisible && (
            <>
                <div className="w-screen h-screen bg-neutral-900 relative z-50 opacity-30"></div>
                <dialog
                    open
                    className="relative m-0 h-[50rem] absolute-center z-50 rounded-3xl px-0 bg-primary-100 py-12"
                >
                    <div className="flex items-center justify-between px-20 gap-2">
                        <H1 underline className="mb-0">
                            Maak een contact
                        </H1>
                        <AvatarComponent
                            data={jsonData}
                            className="w-[12.5rem] h-[12.5rem] bg-primary-500 rounded-full object-cover"
                        />
                    </div>

                    <Form
                        btnLabel="Start"
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        className="px-20 w-1/2"
                    >
                        <span>Beschrijving</span>
                        <Input
                            register={register}
                            name="name"
                            label="Naam"
                            spacing="my-4"
                        />
                        <Input
                            register={register}
                            name="role"
                            label="Rol"
                            spacing="my-4"
                        />
                        <Input
                            register={register}
                            name="relation"
                            label="Relatie"
                            spacing="my-4"
                        />
                    </Form>
                    <Btn submit onClick={() => setModalVisible(false)}>
                        Close
                    </Btn>
                </dialog>
            </>
        )
    );
};

export default Modal;
