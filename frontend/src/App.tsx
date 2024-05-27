import {createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import {ProtectRoute} from '@/hoc/ProtectedRoute.tsx';
import {Elements} from "@/router/routeMap.tsx";
import './App.scss'
import {Layout} from "@/components/common/Layout/Layout.tsx";
import { useEffect, useState} from "react";


export const Root = () => {
    const [isTokenExpired, setTokenExpired] = useState(false);
    const expiresIn = localStorage.getItem('tokenExpires');
    const currentTime = Date.now();
    console.log(!expiresIn || +expiresIn < currentTime)

    const routers =
        Elements.map((router) => (
            <Route
                key={router.path}
                path={router.path}
                element={
                    router.isProtected ?
                        <ProtectRoute rule={true}>
                            {router?.isLayout ? <Layout>{router.element}</Layout> : router.element}
                        </ProtectRoute>
                        : router?.isLayout ? (
                            <Layout>{router.element}</Layout>
                        ) : router.element
                }
            />
        ));

    useEffect(() => {
        const checkTokenExpiration = async () => {
            try {
                const expiresIn = localStorage.getItem('tokenExpires');
                const currentTime = Date.now();
                if (!expiresIn || +expiresIn < currentTime) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpires');
                    setTokenExpired(true);
                } else {
                    setTokenExpired(false);
                }
            } catch (error) {
                console.error('Error checking token expiration:', error);
            }
        };
        checkTokenExpiration();
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
