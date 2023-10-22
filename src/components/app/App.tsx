import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';
import MainPage from '../../pages/main-page/main-page';
import SignIn from '../../pages/sign-in/sign-in';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';

function App() {
  const { isLoading } = useSelector((state: any) => state.ingredientsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
