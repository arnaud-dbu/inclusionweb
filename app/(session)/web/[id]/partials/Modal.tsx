"use client";

import { useForm } from "react-hook-form";
import { H1, H2 } from "@/components/Headings";
import Form from "@/components/form/Form";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { AnimalIcon, GroupIcon, PersonIcon, PlaceIcon } from "@/public/icons";
import SelectButton from "@/components/form/SelectButton";
import { Input } from "@/components/form/Input";
import { BlockTitle } from "@/components/form/BlockTitle";
import { SelectAvatar, SelectEditAvatar, SelectImageThumbnail } from "@/components/form/SelectAvatar";
import { CheckButtonGroup } from "@/components/form/CheckButtonGroup";
import { Btn } from "@/components/Buttons";
import { RadioButtons } from "@/components/form/RadioButtonGroup";
import { useState } from "react";
import SelectButtons from "@/components/form/SelectButton";

type Props = {
    modalVisible: any;
    setModalVisible: any;
};

const Modal = ({ modalVisible, setModalVisible }: Props) => {
    const { register, handleSubmit } = useForm();
    const [type, setType] = useState('person');

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
                    className="relative flex items-center justify-center m-0 absolute-center z-50 rounded-3xl px-0 bg-primary-100 pt-20 pb-36">
                    <div className="flex items-center justify-between gap-14 px-20">
                        <div className="flex flex-col gap-5 items-center">
                            <AvatarComponent
                                data={jsonData}
                                className="w-[12.5rem] h-[12.5rem] bg-primary-500 rounded-full object-cover"
                            />
                            <H2 className="mb-0 text-5xl">Nieuw contact</H2>
                        </div>
                        <div className="w-[1.5px] h-[40rem] bg-neutral-400"></div>
                        <Form className="flex flex-col gap-5" register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} >
                            <div>
                                <BlockTitle title="Type" />
                                <SelectButtons
                                    names={['person', 'group', 'place', 'animal']}
                                    labels={['Persoon', 'Groep', 'Plaats', 'Dier']}
                                    icons={[
                                        <PersonIcon key={'person'} className={`w-6 h-6 fill-neutral-900 ${type === 'person' && 'fill-white'}`} />,
                                        <GroupIcon key={'group'} className={`w-6 h-6 fill-neutral-900 ${type === 'group' && 'fill-white'}`} />,
                                        <PlaceIcon key={'place'} className={`w-6 h-6 fill-neutral-900 ${type === 'place' && 'fill-white'}`} />,
                                        <AnimalIcon key={'animal'} className={`w-6 h-6 fill-neutral-900 ${type === 'animal' && 'fill-white'}`} />]}
                                    register={register}
                                    type={type}
                                    setType={setType} />
                                {/* <SelectButton type={type} name="person" setType={setType} register={register} label="Person" icon={<PersonIcon className="w-6 h-6 fill-neutral-900" />} />
                                <SelectButton type={type} name="group" setType={setType} register={register} label="Groep" icon={<GroupIcon className="w-6 h-6 fill-neutral-900" />} />
                                <SelectButton type={type} name="place" setType={setType} register={register} label="Plaats" icon={<PlaceIcon className="w-6 h-6 fill-neutral-900" />} />
                                <SelectButton type={type} name="animal" setType={setType} register={register} label="Dier" icon={<AnimalIcon className="w-6 h-6 fill-neutral-900" />} /> */}
                            </div>
                            <div>
                                <BlockTitle title="Gegevens" />
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <Input secondary register={register} name="name" label="Naam" />
                                        <Input secondary register={register} name="role" label="Rol" />
                                    </div>
                                    <Input secondary register={register} name="relation" label="Relatie" />
                                </div>
                            </div>
                            <div>
                                <BlockTitle title="Afbeelding" />
                                <div className="flex gap-3">
                                    <SelectAvatar type="man" />
                                    <SelectAvatar type="woman" />
                                    <SelectEditAvatar />
                                    <SelectImageThumbnail />
                                </div>
                            </div>
                            <div>
                                <BlockTitle title="Gegeven Steun" />
                                <CheckButtonGroup register={register} name="given_support" buttons={['Emotioneel', 'Gezelligheid', 'Praktisch', 'Goede raad']} />
                            </div>
                            <div>
                                <BlockTitle title="Ontvangen Steun" />
                                <CheckButtonGroup register={register} name="received_support" buttons={['Emotioneel', 'Gezelligheid', 'Praktisch', 'Goede raad']} />
                            </div>
                            <div className="flex gap-3 absolute bottom-10 right-20">
                                <Btn secondary submit>Annuleer</Btn>
                                <Btn primary submit>Opslaan</Btn>
                            </div>
                            <div className="">
                                <BlockTitle title="Frequentie" />
                                <RadioButtons register={register} buttons={['Nooit', 'Dagelijks', 'Wekelijks', 'Maandelijks', 'Jaarlijks']} name="test" />
                            </div>
                        </Form>
                    </div>
                    {/* <Btn submit onClick={() => setModalVisible(false)}>
                        Close
                    </Btn> */}
                </dialog>
            </>
        )
    );
};

export default Modal;
