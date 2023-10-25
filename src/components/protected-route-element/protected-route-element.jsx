import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserRequest } from '../../services/actions/account';

export function ProtectedRouteElement({ element }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.accountStore.user);

  useEffect(() => {
    dispatch(getUserRequest())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // You can render a loading indicator here
  }

  return name !== '' ? element : <Navigate to="/login" replace />;
}
export default ProtectedRouteElement;
