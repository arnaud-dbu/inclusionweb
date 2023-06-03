"use client";

import { WebProvider } from "@/context/WebContext";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <WebProvider>{children}</WebProvider>;
}
