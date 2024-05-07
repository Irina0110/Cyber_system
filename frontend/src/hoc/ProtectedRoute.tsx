import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectRouteProps = PropsWithChildren & {
    rule: boolean;
};

export const ProtectRoute: FC<ProtectRouteProps> = ({ children, rule }) => (rule ? children : <Navigate to={'/'} />);
