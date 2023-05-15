"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabase } from "./supabase-provider";
import { useState } from "react";

export default function Login() {

    const [supabase] = useState(() => createBrowserSupabaseClient());


    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email: "arnauddbu@gmail.com",
            password: "sup3rs3cur3",
        });
    };

    const handleLogin = async () => {
        await supabase.auth.signInWithPassword({
            email: "arnauddbu@gmail.com",
            password: "test123",
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div>
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
