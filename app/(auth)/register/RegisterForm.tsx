"use client"

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/components/form/Form";
import keyIcon from "@/public/icons/key.svg";
import emailIcon from "@/public/icons/email.svg";
import Input from "@/components/form/Input";
import { useSupabase } from "@/app/supabase-provider";
import { redirect } from "next/navigation";

// interface for form
type EmailInterface = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// validation
const EmailSchema = yup.object().shape({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .max(32, "Max password length is 32")
        .required("Password is required")
});

const RegisterForm = () => {

    const { supabase } = useSupabase();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(EmailSchema) });

    const onSubmit = async (data: EmailInterface) => {
        await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            }
        })
    };

    return (
        <Form
            btnLabel="Registreer"
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            className="w-full"
        >
            <Input
                name="firstName"
                label="Voornaam"
                type="text"
                error={errors.firstName?.message}
                className="w-[48%] mb-3"
            />
            <Input
                type="text"
                name="lastName"
                label="Naam"
                error={errors.lastName?.message}
                className="w-[48%] mb-3"

            />
            <Input
                name="email"
                type="email"
                label="Email"
                error={errors.email?.message}
                className="mb-3"
                icon={emailIcon}
                alt="email icon"
            />
            <Input
                name="password"
                type="password"
                label="Password"
                icon={keyIcon}
                alt="key icon"
                error={errors.password?.message}
            />
        </Form>
    )
}

export default RegisterForm