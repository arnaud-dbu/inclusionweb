"use client";

import { EditAvatarProvider } from "@/context/EditAvatarContext";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <EditAvatarProvider>{children}</EditAvatarProvider>;
}
