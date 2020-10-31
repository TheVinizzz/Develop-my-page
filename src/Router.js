import React, { Fragment, lazy, Suspense } from 'react';
import {CircularProgress} from '@material-ui/core'
// eslint-disable-next-line
import { Redirect, Route, Switch } from 'react-router-dom';

// eslint-disable-next-line
import AuthGuard from './ui/components/AuthGuard';

// Aplicação
export const INDEX_ROUTE = "/";
export const APP_ROUTE = "/app";

// Autenticação
export const LOGIN_ROUTE = "/entrar";
export const REGISTER_ROUTE = "/cadastro";

export const CHAT_ROUTE = "/app/chat";

const routesConfig = [
    {
        exact: true,
        path: INDEX_ROUTE,
        component: lazy(() => import('./ui/pages/welcome'))
    },
    {
        exact: true,
        path: LOGIN_ROUTE,
        component: lazy(() => import('./ui/pages/login'))
    },
    {
        exact: true,
        path: REGISTER_ROUTE,
        component: lazy(() => import('./ui/pages/register'))
    },
    {
        path: APP_ROUTE,
         guard: AuthGuard,
         routes: [
               {
                exact: true,
                 path: CHAT_ROUTE,
                 component: lazy(() => import('./ui/chat/ChatPage'))
               },
           ]
    }
];

const renderRoutes = (routes) => {
    return (routes ? (
        <Suspense fallback={<CircularProgress color="secondary" />}>
            <Switch>
                {routes.map((route, i) => {
                    const Guard = route.guard || Fragment;
                    const Layout = route.layout || Fragment;
                    const Component = route.component;

                    return (
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render={(props) => (
                                <Guard>
                                    <Layout>
                                        {route.routes
                                            ? renderRoutes(route.routes)
                                            : <Component {...props} />}
                                    </Layout>
                                </Guard>
                            )}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    ) : null);
};

function Routes() {
    return renderRoutes(routesConfig);
}

export default Routes;
