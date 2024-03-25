import Container from "@/components/ui/container";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Notification from "./components/notification";
import { Suspense } from "react";


const PageSearch = () => {
    return (
        <Container className="bg-[#F2F2F2]">
            <div className="lg:grid lg:grid-cols-9 lg:gap-x-8 pt-5">
                <div className="hidden lg:col-span-2 h-fit lg:block bg-white rounded-sm">
                    <Navbar />
                </div>
                <div className="lg:col-span-5 bg-[#F2F2F2] rounded-sm">
                    <Suspense>
                        <Main />
                    </Suspense>
                </div>
                <div className="hidden lg:block lg:col-span-2 h-fit bg-white rounded-sm">
                    <Notification />
                </div>
            </div>
        </Container>
    )
}

export default PageSearch;