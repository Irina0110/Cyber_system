import {FC, useCallback} from "react";
import './Header.scss';
import Logo from '../../../../public/Logo-full.svg?url'
import {Button} from "@/components/ui/button.tsx";
import {ExitIcon} from "@radix-ui/react-icons";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "@/router/routes.ts";
import {useStore} from "@nanostores/react";
import {commonStore} from "@/store/common.ts";

const CLASS = 'header';
export const Header:FC = () => {
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);
    const user = useStore(commonStore.user);

    const handleLogout = () => {
        localStorage.clear()
        onNavigate(routes.auth.login)
    }

    const handleNavigateToProfile = () => {
        onNavigate(`/${user.role.toLowerCase()}/profile/${user.id}`)
    }

    return(
        <div className={`${CLASS}__wrapper`}>
            <div className={CLASS}>
                <div className={`${CLASS}__menu`}>
                    <img src={Logo} alt={'logo'}/>
                    <Link to={routes.teams.all} className={`${CLASS}__menu__item`}>Teams</Link>
                </div>
                <div className={`${CLASS}__user`} onClick={handleNavigateToProfile}>
                    <div>{user.username}</div>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <ExitIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}