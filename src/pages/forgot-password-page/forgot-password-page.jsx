import React, { useEffect } from 'react';
import {
  Button, EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './forgot-password-page.module.css';
import { passwordResetRequest } from '../../services/actions/account';

function ForgotPasswordPage() {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success } = useSelector((store) => store.accountStore.passwordResetRequest);

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleOnClick = () => {
    dispatch(passwordResetRequest(value));
  };

  useEffect(() => {
    if (success) {
      navigate('/reset-password');
    }
  }, [success, navigate]);

  return (
    <div className={styles.forgotPasswordWindow}>
      <div className={styles.forgotPasswordBox}>
        <div className="text text_type_main-medium">Восстановление пароля</div>
        <EmailInput
            /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={handleOnChange}
          value={value}
          name="email"
          isIcon={false}
          placeholder="Укажите e-mail"
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

export default ForgotPasswordPage;
