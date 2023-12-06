import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks';

type TProtectedRouteElementProps = {
  element: ReactElement;
  anonymous?: boolean;
}

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element, anonymous = false }) => {
  const name = useSelector((store) => store.accountStore.user.name);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && name) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !name) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

ProtectedRouteElement.defaultProps = {
  anonymous: false,
};

export default ProtectedRouteElement;
