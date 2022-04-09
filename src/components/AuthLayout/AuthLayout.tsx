import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <>
      <main className="min-h-screen bg-gray-100 flex flex-col justify-center">
        <Outlet />
      </main>
    </>
  );
}
