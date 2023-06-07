import { NetworkIllustration } from "@/public/illustrations";
import Image from "next/image";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = createServerComponentSupabaseClient({
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
				<div
					className={`absolute-center z-50 flex items-center gap-[7.5rem] bg-white py-20 px-24 rounded-3xl border-2 border-neutral-500 shadow-lg`}>
					<div className={`flex flex-col items-center gap-3 w-[22.5rem]`}>
						<div className={`flex flex-col items-center gap-3 w-[22.5rem]`}>{children}</div>
					</div>
				</div>
				<div>
					<Image className={`w-[100rem] opacity-60`} src={NetworkIllustration} alt="Network" />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
