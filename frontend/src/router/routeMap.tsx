import {LoginPage} from "@/pages/Login/Login.tsx";
import {SignUpPage} from "@/pages/SignUp/SignUp.tsx";
import {routes} from "@/router/routes.ts";
import {ResetPasswordPage} from "@/pages/ResetPassword/ResetPassword.tsx";
import {Error} from "@/pages/Error/Error.tsx";
import {PlayerProfile} from "@/pages/PlayerProfile/PlayerProfile.tsx";
import {Teams} from "@/pages/Teams/Teams.tsx";
import {Team} from "@/pages/Team/Team.tsx";
import {CoachProfile} from "@/pages/CoachProfile/CoachProfile.tsx";


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
        isProtected: true,
        path: routes.player.profile,
        isLayout: true,
        element: <PlayerProfile/>
    },
    {
        isProtected: true,
        path: routes.coach.profile,
        isLayout: true,
        element: <CoachProfile/>
    },
    {
        isProtected: true,
        path: routes.teams.all,
        isLayout: true,
        element: <Teams/>
    },
    {
        isProtected: true,
        path: routes.teams.team,
        isLayout: true,
        element: <Team/>
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