import React from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './register-page.module.css';
import { registerRequest } from '../../services/actions/account';

function RegisterPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');
  const dispatch = useDispatch();
  const { success } = useSelector((store) => store.accountStore.registerRequest.success);
  const navigate = useNavigate();

  const handleOnClick = () => {
    dispatch(registerRequest(email, password, name));
  };

  React.useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  return (
    <div className={styles.registerWindow}>
      <div className={styles.registerBox}>
        <div className="text text_type_main-medium">Регистрация</div>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="ml-1 mt-6"
        />
        <EmailInput
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="medium" onClick={handleOnClick}>
            Зарегестрироваться
          </Button>
        </div>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>
            Уже зарегистрированы?
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

export default RegisterPage;
