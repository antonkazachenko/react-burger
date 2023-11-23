import React, { FC } from 'react';
import {
  Button, EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, useForm } from '../../hooks';
import styles from './forgot-password-page.module.css';
import { emailCheckRequest, emailCheckReset, getUserRequest } from '../../services/actions/account';

const ForgotPasswordPage: FC<void> = () => {
  const { values, handleChange } = useForm({ email: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useSelector((store) => store.accountStore.emailCheckRequest);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(emailCheckRequest(values.email));
  };

  React.useEffect(() => {
    dispatch(getUserRequest());
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
};

export default ForgotPasswordPage;
