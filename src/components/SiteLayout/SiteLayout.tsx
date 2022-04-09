import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

type User = {
  id: number;
  name: string;
};

export function SiteLayout() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('AT');
    setAccessToken(token);
  }, []);

  useEffect(() => {
    const storageWatcher = (e: StorageEvent) => {
      if (e.key === 'AT') {
        if (e.newValue) {
          setAccessToken(e.newValue);
        } else {
          setAccessToken(null);
        }
      }
      console.log(e);
    };
    window.addEventListener('storage', storageWatcher);
    return () => {
      window.removeEventListener('storage', storageWatcher);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('AT', accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      try {
        const { name, sub: id } =
          jwtDecode<{ name: string; sub: number }>(accessToken);
        setUser({ name, id });
      } catch (err) {
        console.log(err);
      }
    } else {
      setUser(null);
    }
  }, [accessToken]);

  return (
    <>
      <header className="bg-gray-200 text-gray-900">
        <nav className="max-w-xl mx-auto py-2 flex flex-row justify-between">
          <div className="flex space-x-5 items-center">
            <NavLink to="/">Посты</NavLink>
            <NavLink to="/users">Пользователи</NavLink>
          </div>
          <div className="flex space-x-5 items-center">
            {user ? (
              <>
                <div>{user.name}</div>
                <button
                  onClick={() => {
                    localStorage.removeItem('AT');
                    setAccessToken(null);
                  }}
                  type="button"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <NavLink to="/auth/login">Вход</NavLink>
                <NavLink
                  className="bg-blue-700 text-white text-sm px-3 py-1 rounded-md"
                  to="/auth/register"
                >
                  Регистрация
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="bg-gray-100">
        <div className="max-w-xl mx-auto py-5">
          <Outlet />
        </div>
      </main>
    </>
  );
}
