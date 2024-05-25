import {FC, ReactNode} from "react";
import {Header} from "@/components/common/Header/Header.tsx";

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
    return(
        <>
            <Header/>
            <main className={'flex justify-center'}>
                {children}
            </main>

        </>
    )
}
