import {FC, useCallback} from "react";
import './Header.scss';
import Logo from '../../../../public/Logo-full.svg?url'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ExitIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import {routes} from "@/router/routes.ts";
import {useStore} from "@nanostores/react";
import {commonStore} from "@/store/common.ts";
import {playerStore} from "@/store/player.ts";

const CLASS = 'header';
export const Header:FC = () => {
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);
    const user = useStore(commonStore.user);
    const player = useStore(playerStore.profile)

    const handleLogout = () => {
        localStorage.clear()
        onNavigate(routes.auth.login)
    }

    return(
        <div className={`${CLASS}__wrapper`}>
            <div className={CLASS}>
                <div className={`${CLASS}__menu`}>
                    <img src={Logo} alt={'logo'}/>
                    <div className={`${CLASS}__menu__item`}>
                        Team
                    </div>
                </div>
                <div className={`${CLASS}__user`}>
                    <div>{user.username}</div>
                    <Avatar>
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <ExitIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}