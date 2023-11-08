import React from 'react';
import {
  Button, EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './forgot-password-page.module.css';
import { emailCheckRequest, emailCheckReset, getUserRequest } from '../../services/actions/account';
import useForm from '../../hooks/useForm';

function ForgotPasswordPage() {
  const { values, handleChange } = useForm({ email: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useSelector((store: any) => store.accountStore.emailCheckRequest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch<any>(emailCheckRequest(values.email));
  };

  React.useEffect(() => {
    dispatch<any>(getUserRequest());
    if (success) {
      dispatch(emailCheckReset());
      navigate('/reset-password', { state: { from: '/forgot-password' }, replace: true });
    }
  }, [success, navigate, dispatch]);

  return (
    <div className={styles.forgotPasswordWindow}>
      <div className={styles.forgotPasswordBox}>
        <div className="text text_type_main-medium">Восстановление пароля</div>
        <form onSubmit={handleSubmit}>
          <EmailInput
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
            onChange={handleChange}
            value={values.email}
            name="email"
            isIcon={false}
            placeholder="Укажите e-mail"
            extraClass="ml-1 mt-6"
          />
          <div className={`mt-6 ${styles.resetBtn}`}>
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </div>
        </form>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.forgotPasswordLinkBox}`}>
          <div>
            Вспомнили пароль?
          </div>
          <Link to="/login">
            <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
              Войти
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
