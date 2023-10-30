import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import styles from './App.module.css';
import { getIngredients } from '../../services/actions/ingredients';
import MainPage from '../../pages/main-page/main-page';
import SignIn from '../../pages/sign-in/sign-in';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfileMainPage from '../../pages/profile-main-page/profile-main-page';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProfileOrdersPage from '../../pages/profile-orders-page/profile-orders-page';

function App() {
  const { isLoading } = useSelector((state: any) => state.ingredientsStore);
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
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

  return (
    <div className={styles.app}>
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/profile"
          element={(
            <ProtectedRouteElement element={<ProfileMainPage />} />
            )}
        />
        <Route
          path="/profile/orders"
          element={(
            <ProtectedRouteElement element={<ProfileOrdersPage />} />
            )}
        />
        <Route
          path="/profile/orders/:id"
          element={(
            <ProtectedRouteElement element={<ProfileMainPage />} />
            )}
        />
      </Routes>
      {/* {state?.backgroundLocation && ( */}
      {/*  <Routes> */}
      {/*    <Route path="/:id" element={<Modal />} /> */}
      {/*  </Routes> */}
      {/* )} */}
    </div>
  );
}

export default App;
