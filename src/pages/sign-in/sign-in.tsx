import React, { FC } from 'react';
import {
  Button, EmailInput, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, useForm } from '../../hooks';
import styles from './sign-in.module.css';
import { getUserRequest, loginRequest } from '../../services/actions/account';
import { useLanguage } from '../../utils/languageContext';

const SignIn: FC<object> = () => {
  const { values, handleChange } = useForm({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.accountStore);
  const { t } = useLanguage();

  const handleOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(loginRequest(values.email, values.password));
  };

  React.useEffect(() => {
    dispatch(getUserRequest());
    if (user.name !== '') {
      navigate('/', { replace: true });
    }
  }, [user, navigate, dispatch]);

  return (
    <div className={styles.loginWindow}>
      <div className={styles.loginBox}>
        <div className="text text_type_main-medium">{t('loginTitle')}</div>
        <form onSubmit={handleOnSubmit}>
          <EmailInput
            onChange={(e) => handleChange(e)}
            value={values.email}
            name="email"
            isIcon={false}
            extraClass="ml-1 mt-6"
          />
          <PasswordInput
            value={values.password}
            name="password"
            placeholder={t('password')}
            extraClass="ml-1 mt-6"
            onChange={(e) => handleChange(e)}
          />
          <div className={`${styles.loginBtn} mt-6`}>
            <Button htmlType="submit" type="primary" size="medium">
              {t('login')}
            </Button>
          </div>
        </form>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>{t('newUserQuestion')}</div>
          <Link to="/register">
            <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
              {t('registerLink')}
            </Button>
          </Link>
        </div>
        <div className={`mt-4 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>{t('forgotPasswordQuestion')}</div>
          <Link to="/forgot-password">
            <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
              {t('resetPasswordLink')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
