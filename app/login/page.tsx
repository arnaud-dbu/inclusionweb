import H1 from "@/components/Headings"
import facebookLogo from "/public/images/facebook.png"
import googleLogo from "/public/images/google.png"
import DivisionLine from "@/components/DivisionLine"
import Form from "@/components/Form"
import emailSVG from "@/public/icons/email.svg"
import keySVG from "@/public/icons/key.svg"
import { BtnPrimary, BtnSecondary } from "@/components/Buttons"

const login = () => {
    return (
        <>
            <div className="flex flex-col items-center w-96">
                <H1>Aanmelden</H1>
                <p className="text-center">Voer je inloggegevens in om toegang te krijgen tot het inclusieweb</p>
                <BtnSecondary imgSrc={facebookLogo} alt="Hello">Meld aan met Facebook</BtnSecondary>
                <BtnSecondary imgSrc={googleLogo} alt="Hello">Meld aan met Google</BtnSecondary>
                <DivisionLine text="Of" />
                <form className="w-full">
                    <Form label="Email" icon={emailSVG} alt="email icon"/>
                    <Form label="Password" icon={keySVG} alt="email icon"/>
                </form>
                <BtnPrimary alt="Hello">Login</BtnPrimary>
            </div>
        </>
    )
}

export default login