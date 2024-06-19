import Header from "./header";
import { SideBar } from "../_components/Sidebar";
import PageWrapper from "../../../../../components/pagewrapper";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SideBar />
            <div className="flex flex-col h-full w-full">
                <Header />
                <PageWrapper children={children} />
            </div>
        </>
    )
}