// import { NavigationRoutes } from '@constants';
// import { getLanguage } from '@language';

// import Dashboard from '@screens/dashboard/Dashboard';

import { observer } from 'mobx-react-lite';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './pages/PrivateRoute';
import { NavigationRoutes } from './common/constant';
import { Login } from './pages/Register/Login';
// import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { appState } from './state';
import { Landing } from './pages/Register/Landing';
import { Signup } from './pages/Register/Signup';
import { Settings } from './pages/Settings';
import { Users } from './pages/Users/Users';
import { ForgotPassword } from './pages/Register/ForgotPassword';
import { SetPassword } from './pages/Register/SetPassword';
import { Templates } from './pages/Templates/Templates';

export const Router = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        {appState.isUserAuthenticated ? (
          <>
            <Route path="*" element={<Navigate to={NavigationRoutes.Home} />} />
            <Route path={NavigationRoutes.Home} element={<PrivateRoute />}>
              <Route
                path={NavigationRoutes.Dashboard}
                element={<Dashboard />}
              />
              <Route path={NavigationRoutes.Users} element={<Users />} />
              <Route
                path={NavigationRoutes.Templates}
                element={<Templates />}
              />
              <Route path={NavigationRoutes.Settings} element={<Settings />} />
              <Route
                path="/"
                element={<Navigate to={NavigationRoutes.Dashboard} />}
              />
            </Route>
          </>
        ) : (
          <>
            <Route path={NavigationRoutes.SignIn} element={<Login />} />
            <Route path={NavigationRoutes.SignUp} element={<Signup />} />
            <Route
              path={NavigationRoutes.ForgotPassword}
              element={<ForgotPassword />}
            />
            <Route
              path={NavigationRoutes.SetPassword}
              element={<SetPassword />}
            />
            <Route path={NavigationRoutes.Landing} element={<Landing />} />
            <Route
              path="*"
              element={<Navigate to={NavigationRoutes.Landing} />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
});
