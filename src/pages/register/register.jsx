import React from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';

function Register() {
  const [value, setValue] = React.useState('');
  return (
    <div className={styles.registerWindow}>
      <div className={styles.registerBox}>
        <div className="text text_type_main-medium">Регистрация</div>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="ml-1 mt-6"
        />
        <EmailInput
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={() => {
          }}
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
          onChange={() => {
          }}
        />
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="medium">
            Зарегестрироваться
          </Button>
        </div>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.registerLinkBox}`}>
          <div>
            Уже зарегистрированы?
          </div>
          <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
