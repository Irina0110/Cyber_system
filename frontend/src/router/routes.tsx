import {LoginPage} from "@/pages/Login/Login.tsx";

export const Elements = [
    {
        isProtected: true,
        path: '/',
        isLayout: true,
        element: <div>Готово</div>
    },
    {
        isProtected: false,
        path: '/login',
        isLayout: false,
        element: <LoginPage/>
    },
    {
        isProtected: false,
        path: '/registration',
        isLayout: false,
        element: <div>решистр</div>
    },
]