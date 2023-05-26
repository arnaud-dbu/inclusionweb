import Web from "@/app/(session)/new/components/WebIllustration";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-[100dvh] items-center justify-center gap-24">
			<div className="flex flex-col gap-2 w-[25rem]">{children}</div>
			<Web />
		</div>
	);
}
