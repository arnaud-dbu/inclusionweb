import Header from "@/components/Header"
import SideMenu from "@/components/SideMenu"

export default function mainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-[100dvh]">
            <SideMenu />
            <Header title="Mijn overzicht" />
            {children}
        </div>

    )
}
