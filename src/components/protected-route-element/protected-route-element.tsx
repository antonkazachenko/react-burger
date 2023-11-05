import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteElementProps = {
  element: ReactElement;
  anonymous?: boolean;
}

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element, anonymous = false }) => {
  // TODO: remove this any
  const name = useSelector((store: any) => store.accountStore.user.name);

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
