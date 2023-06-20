import SideMenu from "@/components/navigation/NavBar";
import { redirect } from "next/navigation";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";
import Header from "@/components/Header";

type Props = {
	children: React.ReactNode;
};

const SessionLayout = async ({ children }: Props) => {
	return <div className="h-screen">{children}</div>;
};

export default SessionLayout;
