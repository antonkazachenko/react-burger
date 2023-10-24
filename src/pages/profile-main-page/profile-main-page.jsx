import React, { useState } from 'react';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './profile-main-page.module.css';

function ProfileMainPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  return (
    <div className={styles.flex}>
      <div>
        <NavLink
          className={`${styles.menuTab} mt-30 ${styles.linkDecoration}`}
          to="/profile"
        >
          {({ isActive }) => (
            <p className={`text text_type_main-large ${isActive ? styles.activeColor : 'text_color_inactive'}`}>
              Профиль
            </p>
          )}
        </NavLink>
        <NavLink
          className={`${styles.menuTab} ${styles.linkDecoration}`}
          to="/profile/orders"
        >
          {({ isActive }) => (
            <p className={`text text_type_main-large ${isActive ? styles.activeColor : 'text_color_inactive'}`}>
              История заказов
            </p>
          )}
        </NavLink>
        <NavLink className={`${styles.menuTab} ${styles.linkDecoration}`} to="/">
          {({ isActive }) => (
            <p className={`text text_type_main-large ${isActive ? styles.activeColor : 'text_color_inactive'}`}>
              Выйти
            </p>
          )}
        </NavLink>
        <div className="mt-20">
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете
            <br />
            изменить свои персональные данные
          </p>
        </div>
      </div>
      <div className="mt-30 ml-15">
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
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ProfileMainPage;
