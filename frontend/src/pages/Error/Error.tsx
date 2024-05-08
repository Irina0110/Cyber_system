import {FC, useCallback} from "react";
import './Error.scss'
import Logo from '../../../public/Logo.svg?url'
import {Button} from "@/components/common/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {routes} from "@/router/routes.ts";

const CLASS = 'error-page'


export const Error: FC = () => {
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);

    return (
        <div className={CLASS}>
            <div className={`${CLASS}__content`}>
                <h1 className="text-8xl font-extrabold text-rose-600 mb-4">404</h1>
                <div className={`${CLASS}__content__heading`}>
                    <img src={Logo} alt={'logo'} className={`${CLASS}__logo`}/>
                    <h1 className=" text-4xl font-medium text-white-800">Page not found</h1>
                </div>

                <p className=" text-2xl font-medium text-white-800 mt-4">We apologize for the inconvenience. Please try
                    again later.</p>

                <div className={'flex w-48 mt-8'}>
                    <Button label={'Back home'} size={'s'} type={'button'} view={'system'} onClick={() => onNavigate(routes.main)}/>
                </div>
            </div>
        </div>
    )
}