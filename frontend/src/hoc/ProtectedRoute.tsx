import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import {routes} from "@/router/routes.ts";

type ProtectRouteProps = PropsWithChildren & {
    rule: boolean;
};

export const ProtectRoute: FC<ProtectRouteProps> = ({ children, rule }) => (rule ? children : <Navigate to={routes.auth.login} />);
