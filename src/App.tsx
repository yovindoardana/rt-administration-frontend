import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import navigation, { type NavRoute } from './navigation';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import PublicRoute from './components/PublicRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';

export default function App() {
  const location = useLocation();

  const sections = Array.from(
    navigation.reduce((map, route) => {
      const key = route.section ?? 'Main';
      if (!map.has(key)) map.set(key, [] as NavRoute[]);
      map.get(key)!.push(route);
      return map;
    }, new Map<string, NavRoute[]>())
  ).map(([title, items]) => ({
    title: title === 'Main' ? undefined : title,
    items: items.map((r) => ({
      name: r.name,
      href: r.path,
      icon: r.icon,
      current: location.pathname === r.path || location.pathname.startsWith(r.path + '/'),
    })),
  }));

  return (
    <Routes>
      <Route
        path='/login'
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path='/register'
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <RequireAuth>
            <Layout sections={sections} logoSrc='/logo.png'>
              <Outlet />
            </Layout>
          </RequireAuth>
        }>
        {navigation.map((r) => (
          <Route key={r.path} path={r.path.replace(/^\//, '')} element={<r.element />} />
        ))}
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
