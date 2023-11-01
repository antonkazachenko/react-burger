import React from 'react';
import {
  Button, EmailInput, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './sign-in.module.css';
import { getUserRequest, loginRequest } from '../../services/actions/account';

function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.accountStore);

  const handleOnClick = () => {
    dispatch(loginRequest(email, password));
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
        <div className="text text_type_main-medium">Вход</div>
        <EmailInput
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={(e) => { setEmail(e.target.value); }}
          value={email}
          name="email"
          isIcon={false}
          extraClass="ml-1 mt-6"
        />
        <PasswordInput
          value={password}
          name="password"
          extraClass="ml-1 mt-6"
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={(e) => { setPass(e.target.value); }}
        />
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
            Войти
          </Button>
        </div>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>Вы — новый пользователь?</div>
          <Link to="/register">
            <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
              Зарегистрироваться
            </Button>
          </Link>
        </div>
        <div className={`mt-4 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>Забыли пароль?</div>
          <Link to="/forgot-password">
            <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
              Восстановите пароль
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
