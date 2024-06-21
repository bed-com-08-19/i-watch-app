import Header from "../_components/profile-header";
import { SideBar } from "../_components/Sidebar";
import PageWrapper from "../_components/pagewrapper";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SideBar />
            <div className="flex flex-col h-full w-full">
                <Header />
                <PageWrapper>
                    {children}
                </PageWrapper>
            </div>
        </>
    );
}
