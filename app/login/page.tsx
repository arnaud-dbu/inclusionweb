import H1 from "@/components/Headings"
import facebookLogo from "/public/images/facebook.png"
import googleLogo from "/public/images/google.png"
import DivisionLine from "@/components/DivisionLine"
import Input from "@/components/Input"
import emailSVG from "@/public/icons/email.svg"
import keySVG from "@/public/icons/key.svg"
import { BtnPrimary, BtnSecondary } from "@/components/Buttons"
import Checkbox from "@/components/Checkbox"
import { PrimaryLink } from "@/components/Links"
import Web from "@/components/Web"

const login = () => {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[25vw] flex flex-col gap-2 items-center w-96">
                <H1>Aanmelden</H1>
                <p className="text-center mb-3">Voer je inloggegevens in om toegang te krijgen tot het inclusieweb</p>
                <BtnSecondary imgSrc={facebookLogo} alt="Hello">Meld aan met Facebook</BtnSecondary>
                <BtnSecondary imgSrc={googleLogo} alt="Hello">Meld aan met Google</BtnSecondary>
                <DivisionLine text="Of" />
                <form className="w-full">
                    <Input className="mb-3" label="Email" icon={emailSVG} alt="email icon" />
                    <Input className="mb-2" label="Password" icon={keySVG} alt="email icon" />
                </form>
                <div className="flex justify-between w-full mb-2">
                    <Checkbox label="Blijf ingelogd" />
                    <PrimaryLink href="/forgot-password">Wachtwoord vergeten?</PrimaryLink>
                </div>
                <BtnPrimary alt="Hello">Login</BtnPrimary>
                <PrimaryLink className="my-2" href="/forgot-password">Meld aan</PrimaryLink>
            </div>
            <Web />
        </>
    )
}

export default login