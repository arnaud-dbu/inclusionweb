import H1 from "@/components/Headings"
import Link from "next/link"
import RegisterForm from "./RegisterForm";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from 'next/headers'
import { redirect } from "next/navigation";


const RegisterPage = async () => {

    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies
    })

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        return redirect("/welcome")
    }

    return (
        <>
            <H1>Maak een account</H1>
            <p className="mb-3">Je kunt dit heel snel en eenvoudig doen</p>
            <RegisterForm />
            <Link href="/auth/login" className="link">Meld je aan</Link>
        </>
    )
}

export default RegisterPage

