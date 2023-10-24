import React, { useEffect } from 'react';
import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './reset-password-page.module.css';
import { resetPasswordRequest } from '../../services/actions/account';

function ResetPasswordPage() {
  const [password, setPassword] = React.useState('');
  const [emailCode, setEmailCode] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((store) => store.accountStore);
  const { success } = useSelector((store) => store.accountStore.passwordResetRequest);

  // TODO: fix the token issue
  const handleOnClick = () => {
    dispatch(resetPasswordRequest(password, accessToken));
  };

  useEffect(() => {
    if (success) {
      navigate('/', { replace: true });
    }
  }, [success, navigate]);

  return (
    <div className={styles.forgotPasswordWindow}>
      <div className={styles.forgotPasswordBox}>
        <div className="text text_type_main-medium">Восстановление пароля</div>
        <PasswordInput
          value={password}
          name="password"
          placeholder="Введите новый пароль"
          extraClass="ml-1 mt-6"
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={(e) => setEmailCode(e.target.value)}
          value={emailCode}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="ml-1 mt-6"
        />
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
            Восстановить
          </Button>
        </div>
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
