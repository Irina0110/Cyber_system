import {createBrowserRouter, Route, RouterProvider, Routes, useNavigate} from 'react-router-dom';
import {ProtectRoute} from '@/hoc/ProtectedRoute.tsx';
import {Elements} from "@/router/routeMap.tsx";
import './App.scss'
import {Layout} from "@/components/common/Layout/Layout.tsx";
import {useCallback, useLayoutEffect} from "react";
import {auth} from "@/services/auth.tsx";
import {commonStore} from "@/store/common.ts";
import {isTokenExpired} from "@/lib/utils.ts";
import {routes} from "@/router/routes.ts";


export const Root = () => {
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);
    const tokenExpires = localStorage.getItem('tokenExpires')

    const routers =
        Elements.map((router) => (
            <Route
                key={router.path}
                path={router.path}
                element={
                    router.isProtected ?
                        <ProtectRoute rule={!isTokenExpired(tokenExpires ? +tokenExpires : 0)}>
                            {router?.isLayout ? <Layout>{router.element}</Layout> : router.element}
                        </ProtectRoute>
                        : router?.isLayout ? (
                            <Layout>{router.element}</Layout>
                        ) : router.element
                }
            />
        ));

    useLayoutEffect(() => {
        auth.status().then((response) => {
            if (response.statusText === 'OK' && isTokenExpired(+response.data.expiresIn)) {
                commonStore.user.set(response.data)
            } else {
                localStorage.clear();
                onNavigate(routes.auth.login)
            }
        })
    }, []);


    return (
        <Routes>
            {routers}
        </Routes>
    );
};

export const router = createBrowserRouter([{path: '*', Component: Root}]);

export default function App() {
    return <RouterProvider router={router}/>;
}
