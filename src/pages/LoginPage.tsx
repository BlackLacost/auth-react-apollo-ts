import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';

export function LoginPage() {
  const [formInput, setFormInput] = useState({
    username: 'blacklacost',
    password: 'password',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [fromPage] = useState((location.state as any)?.from?.pathname ?? '/');

  // const fromPage = (location.state as any)?.from?.pathname || '/';
  const [loginMutation, { data }] = useLoginMutation();

  if (data) {
    localStorage.setItem('AT', data.login.token);
    console.log(fromPage);
    navigate(fromPage, { replace: true });
  }

  const inputHandle = (e: any) => {
    e.preventDefault();
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = (e: any) => {
    e.preventDefault();
    loginMutation({ variables: { ...formInput } });
  };

  return (
    <>
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Вход
        </h1>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form className="space-y-5" onSubmit={submitHandle}>
          <div>
            <label className="form-label" htmlFor="usernameInput">
              Username
            </label>
            <input
              className="form-input"
              onChange={inputHandle}
              name="username"
              placeholder="username"
              value={formInput.username}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="passwordInput">
              Пароль
            </label>
            <input
              className="form-input"
              onChange={inputHandle}
              id="passwordInput"
              name="password"
              placeholder="password"
              type="password"
              value={formInput.password}
            />
          </div>
          <div className="flex flex-row w-full justify-between space-x-4">
            <button
              className="button w-44 bg-gray-700"
              onClick={() => navigate(-1)}
              type="button"
            >
              Назад
            </button>
            <button className="button w-full" type="submit">
              Отправить
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
