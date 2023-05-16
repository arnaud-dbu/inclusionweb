
import { H1 } from "@/components/Headings"
import facebookLogo from "/public/images/facebook.png"
import googleLogo from "/public/images/google.png"
import DivisionLine from "@/components/DivisionLine"
import { Btn } from "@/components/Buttons"
import Checkbox from "@/components/Checkbox"
import Link from "next/link"
import LoginForm from "./LoginForm"
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import { redirect } from "next/navigation"


const LoginPage = async () => {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies
    })

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        return redirect("/")
    }

    return (
        <div>
            <H1>Aanmelden</H1>
            <p className="text-center mb-3">Voer je inloggegevens in om toegang te krijgen tot het inclusieweb</p>
            <Btn secondary imgSrc={facebookLogo} alt="Hello" className="mb-2">Meld aan met Facebook</Btn>
            <Btn secondary imgSrc={googleLogo} alt="Hello">Meld aan met Google</Btn>
            <DivisionLine text="Of" />
            <LoginForm />
            <div className="flex justify-between w-full mb-2">
                <Checkbox label="Blijf ingelogd" />
                <Link href="/auth/register" className="link">Wachtwoord vergeten?</Link>
            </div>
            <Link href="/auth/register" className="link">Registreer</Link>
        </div>
    )
}

export default LoginPage

