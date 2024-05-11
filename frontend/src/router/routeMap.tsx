import {LoginPage} from "@/pages/Login/Login.tsx";
import {SignUpPage} from "@/pages/SignUp/SignUp.tsx";
import {routes} from "@/router/routes.ts";
import {ResetPasswordPage} from "@/pages/ResetPassword/ResetPassword.tsx";
import {Error} from "@/pages/Error/Error.tsx";


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
    {
        isProtected: false,
        path: routes.auth.reset,
        isLayout: false,
        element: <ResetPasswordPage/>
    },
    {
        isProtected: false,
        path: routes.error,
        isLayout: false,
        element: <Error/>
    },
    {
        isProtected: false,
        path: routes.notFound,
        isLayout: false,
        element: <Error/>
    },
]