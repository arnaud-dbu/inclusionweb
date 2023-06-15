import SideMenu from "@/components/navigation/SideMenu";
import { redirect } from "next/navigation";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";

type Props = {
	children: React.ReactNode;
};

const SessionLayout = async ({ children }: Props) => {
	return <div className="h-screen">{children}</div>;
};

export default SessionLayout;