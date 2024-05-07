import {LoginPage} from "@/pages/Login/Login.tsx";
import {SignUpPage} from "@/pages/SignUp/SignUp.tsx";
import {routes} from "@/router/routes.ts";


export const Elements = [
    {
        isProtected: true,
        path: '/',
        isLayout: true,
        element: <div>Готово</div>
    },
    {
        isProtected: false,
        path: routes.auth.login,
        isLayout: false,
        element: <LoginPage/>
    },
    {
        isProtected: false,
        path: routes.auth.signup,
        isLayout: false,
        element: <SignUpPage/>
    },
]