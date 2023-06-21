import { NetworkIllustration } from "@/public/illustrations";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";
import { Card } from "@/components/Card";
import { ResokitLogoVertical } from "@/public/logos";

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
		<div className="flex h-screen items-center justify-center">
			<div className={`flex items-center gap-16 px-4`}>
				<Card
					className={`absolute left-1/2 top-1/2 z-10 flex w-[90%] max-w-[35rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-1 px-6 py-8 md:gap-2 md:px-12 md:py-10 lg:gap-3`}>
					{children}
				</Card>
				<Image
					className={`invisible w-screen max-w-[40rem] opacity-50 md:visible md:max-w-[60rem] lg:max-w-[70rem] 3xl:lg:max-w-[95rem] `}
					src={NetworkIllustration}
					alt="Network"
				/>

				<div
					className={`invisible bottom-10 right-10 w-28 rounded-full bg-primary-300 p-4 md:absolute lg:visible lg:w-40`}>
					<Image
						className=""
						src={ResokitLogoVertical}
						width={150}
						height={150}
						alt="Resokit Logo"
					/>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
