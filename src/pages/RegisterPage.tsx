import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../generated/graphql';

export function RegisterPage() {
  const [formInput, setFormInput] = useState({
    username: 'blacklacost',
    password: 'password',
    name: 'Ilya',
  });

  const navigate = useNavigate();
  const [signupMutation, { data }] = useSignUpMutation();

  if (data) {
    localStorage.setItem('AT', data.signup.token);
    navigate('/');
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
    console.log(formInput);
    signupMutation({ variables: { ...formInput } });
  };

  return (
    <>
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Регистрация
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
          <div>
            <label className="form-label" htmlFor="nameInput">
              Имя
            </label>
            <input
              className="form-input"
              onChange={inputHandle}
              id="nameInput"
              name="name"
              placeholder="name"
              value={formInput.name}
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
