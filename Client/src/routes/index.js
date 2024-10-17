import React, { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from '../layouts/dashboard';
import MainLayout from '../layouts/main/index';

// config
import { DEFAULT_PATH } from '../config';
import LoadingScreen from '../components/LoadingScreen';

// Lazy-loaded components
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Setting = Loadable(lazy(() => import('../pages/dashboard/Setting')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const GroupChat = Loadable(lazy(() => import('../pages/dashboard/GroupChat')));
const Call = Loadable(lazy(() => import('../pages/dashboard/Call')));
const Profile = Loadable(lazy(()=> import('../pages/dashboard/Profile')));
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify.js")));
export default function Router() {
  return useRoutes([
    {
      path: '/auth',
      element: <MainLayout />,
      children: [
        { element: <Login />, path: 'login' },
        { element: <Register />, path: 'register' },
        { element: <ResetPassword/>, path:'reset-password'},
        { element: <NewPassword/>, path: 'new-password'},
        {element: <VerifyPage/>, path:'verify'}
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'setting', element: <Setting /> },
        { path: 'group-chat', element: <GroupChat/>},
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
        { path: 'Call', element: <Call />},
        { path: 'Profile', element: <Profile/>}
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
