import SideMenu from "@/components/SideMenu"

export default function mainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-[100dvh]">
            <SideMenu />
            {children}
        </div>
    )
}
