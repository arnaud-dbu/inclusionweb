import SideMenu from "@/components/SideMenu";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode;
};

const SessionLayout = async ({ children }: Props) => {
    // Check if user is logged in, if not redirect to login page
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="h-[100dvh]">
            <SideMenu />
            {children}
        </div>
    );
};

export default SessionLayout;
