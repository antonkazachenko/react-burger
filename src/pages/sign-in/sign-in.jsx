import React from 'react';
import {
  Button, EmailInput, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './sign-in.module.css';

function SignIn() {
  const [value] = React.useState('');
  return (
    <div className={styles.loginWindow}>
      <div className={styles.loginBox}>
        <div className="text text_type_main-medium">Вход</div>
        <EmailInput
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={() => {}}
          value={value}
          name="email"
          isIcon={false}
          extraClass="ml-1 mt-6"
        />
        <PasswordInput
          value={value}
          name="password"
          extraClass="ml-1 mt-6"
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={() => {}}
        />
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="medium">
            Войти
          </Button>
        </div>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>Вы — новый пользователь?</div>
          <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
            Зарегистрироваться
          </Button>
        </div>
        <div className={`mt-4 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>Забыли пароль?</div>
          <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
            Восстановите пароль
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
