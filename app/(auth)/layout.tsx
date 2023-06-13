import { NetworkIllustration } from "@/public/illustrations";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";
import { Card } from "@/components/Card";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = createServerComponentSupabaseClient<Database>({
		headers,
		cookies,
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return redirect("/dashboard");
	}

	return (
		<div className="flex h-[100dvh] items-center justify-center">
			<div className={`flex gap-16 items-center`}>
				<Card
					className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-20 py-16 z-10 flex flex-col gap-3 w-[35rem]`}>
					{children}
				</Card>
				<Image className={`w-[90rem] opacity-50`} src={NetworkIllustration} alt="Network" />
			</div>
		</div>
	);
};

export default AuthLayout;
