import { ReactChildren, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { JsxElement } from 'typescript';

type Props = {
  children: JSX.Element;
};

export function RequireAuth({ children }: Props): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  // const [auth, setAuth] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('AT');
  //   setAuth(token ? true : false);
  // }, []);

  // useEffect(() => {
  //   if (!auth) {
  //     navigate('/auth/login', { state: { from: location } });
  //   }
  // }, []);

  return children;
}
