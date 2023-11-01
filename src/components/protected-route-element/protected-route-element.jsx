import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRouteElement({ element, anonymous = false }) {
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
}
