import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthLayout } from './components/AuthLayout/AuthLayout';
import { SiteLayout } from './components/SiteLayout/SiteLayout';
import { RequireAuth } from './hoc/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFoundPage';
import { PostsPage } from './pages/PostsPages';
import { RegisterPage } from './pages/RegisterPage';
import { UsersPage } from './pages/UsersPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<PostsPage />} />
          <Route
            path="users"
            element={
              <RequireAuth>
                <UsersPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
