import {createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import {ProtectRoute} from '@/hoc/ProtectedRoute.tsx';
import {Elements} from "@/router/routes.tsx";
import './App.scss'


export const Root = () => {
    const tokenExpires = localStorage.getItem('tokenExpires');

    const routers =
        Elements.map((router) => (
            <Route
                key={router.path}
                path={router.path}
                element={
                    router.isProtected ?
                        <ProtectRoute rule={!tokenExpires || tokenExpires > Date.now().toString()}>
                            {router?.isLayout ? <div>{router.element}</div> : router.element}
                        </ProtectRoute>
                        : router?.isLayout ? (
                            <div>{router.element}</div>
                        ) : router.element
                }
            />
        ));

    return <Routes>{routers}</Routes>;
};

export const router = createBrowserRouter([{path: '*', Component: Root}]);

export default function App() {
    return <RouterProvider router={router}/>;
}
