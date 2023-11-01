import React from 'react';
import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './reset-password-page.module.css';
// eslint-disable-next-line import/named
import { getUserRequest, resetPasswordRequest, resetPasswordReset } from '../../services/actions/account';
import useForm from '../../hooks/useForm';

function ResetPasswordPage() {
  const { values, handleChange } = useForm({ password: '', emailCode: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useSelector((store) => store.accountStore.passwordResetRequest);
  const { user } = useSelector((state) => state.accountStore);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordRequest(values.password, values.emailCode));
  };

  React.useEffect(() => {
    dispatch(getUserRequest());
    if (user.name !== '') {
      navigate('/', { replace: true });
    } else if (success) {
      dispatch(resetPasswordReset());
      navigate('/login', { replace: true });
    }
  }, [success, navigate, dispatch, user.name]);
  return (
    <div className={styles.forgotPasswordWindow}>
      <div className={styles.forgotPasswordBox}>
        <div className="text text_type_main-medium">Восстановление пароля</div>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            value={values.password}
            name="password"
            placeholder="Введите новый пароль"
            extraClass="ml-1 mt-6"
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            /* eslint-disable-next-line @typescript-eslint/no-empty-function */
            onChange={handleChange}
            value={values.emailCode}
            name="emailCode"
            error={false}
            errorText="Ошибка"
            size="default"
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

export default ResetPasswordPage;
