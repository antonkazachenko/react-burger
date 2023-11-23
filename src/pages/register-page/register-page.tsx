import React, { FC } from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, useForm } from '../../hooks';
import styles from './register-page.module.css';
import { getUserRequest, registerRequest } from '../../services/actions/account';

const RegisterPage: FC<void> = () => {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.accountStore);

  const handleOnSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(registerRequest(values.email, values.password, values.name));
  };

  React.useEffect(() => {
    dispatch(getUserRequest());
    if (user.name !== '') {
      navigate('/', { replace: true });
    }
  }, [navigate, dispatch, user.name]);

  return (
    <div className={styles.registerWindow}>
      <div className={styles.registerBox}>
        <div className="text text_type_main-medium">Регистрация</div>
        <form onSubmit={handleOnSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={handleChange}
            value={values.name}
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="ml-1 mt-6"
          />
          <EmailInput
            /* eslint-disable-next-line @typescript-eslint/no-empty-function */
            onChange={handleChange}
            value={values.email}
            name="email"
            isIcon={false}
            extraClass="ml-1 mt-6"
          />
          <PasswordInput
            value={values.password}
            name="password"
            extraClass="ml-1 mt-6"
            /* eslint-disable-next-line @typescript-eslint/no-empty-function */
            onChange={handleChange}
          />
          <div className={`mt-6 ${styles.registerBtn}`}>
            <Button htmlType="submit" type="primary" size="medium">
              Зарегестрироваться
            </Button>
          </div>
        </form>
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
};

export default RegisterPage;
