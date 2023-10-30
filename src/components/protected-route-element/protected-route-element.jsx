import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { getUserRequest } from '../../services/actions/account';
import styles from '../app/App.module.css';

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
    return (
      <div className={styles.spinner}>
        <MoonLoader
          color="rgb(133, 133, 173, 1)"
          cssOverride={{}}
          loading
          size={100}
          speedMultiplier={1}
        />
      </div>
    );
  }

  return name !== '' ? element : <Navigate to="/login" replace />;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
