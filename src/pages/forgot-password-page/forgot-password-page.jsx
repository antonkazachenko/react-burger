import React from 'react';
import {
  Button, EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';

function ForgotPasswordPage() {
  const [value] = React.useState('Укажите e-mail');
  return (
    <div className={styles.forgotPasswordWindow}>
      <div className={styles.forgotPasswordBox}>
        <div className="text text_type_main-medium">Восстановление пароля</div>
        <EmailInput
          /* eslint-disable-next-line @typescript-eslint/no-empty-function */
          onChange={() => {
          }}
          value={value}
          name="email"
          isIcon={false}
          extraClass="ml-1 mt-6"
        />
        <div className="mt-6">
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <div className={`mt-20 text text_type_main-default text_color_inactive ${styles.forgotPasswordLinkBox}`}>
          <div>
            Вспомнили пароль?
          </div>
          <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.secondaryButton} ml-2`}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
