import Header from "@/components/SideMenu"

export default function mainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-[100dvh]">
            <Header />
            {children}
        </div>

    )
}
