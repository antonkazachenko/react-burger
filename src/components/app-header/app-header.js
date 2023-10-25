import React from 'react';
import {
  BurgerIcon, ListIcon, Logo, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';

function AppHeader() {
  const { user } = useSelector((store) => store.accountStore);

  return (
    <header className={styles.navBar}>
      <nav className={`${styles.flexCentered} ${styles.navTab}`}>
        <div className={`${styles.flexCentered} mt-4 mb-4 p-5 mr-2`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className={styles.navLink}>
            <div className="mr-2">
              <BurgerIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
              Конструктор
            </p>
          </a>
        </div>
        <div className={`${styles.flexCentered} mt-4 mb-4 p-5`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className={`${styles.navLink} ${styles.secondary}`}>
            <div className="mr-2">
              <ListIcon type="secondary" className={styles.secondary} />
            </div>
            <p className={`text text_type_main-default ${styles.secondary}`}>
              Лента заказов
            </p>
          </a>
        </div>
      </nav>
      <Logo />
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <Link to="/profile" className={`${styles.linkDecoration} ${styles.flexCentered} ${styles.navTab} ${styles.navRight} ${styles.navLink} mt-4 mb-4 p-5`}>
        <div className="mr-2">
          <ProfileIcon type="secondary" />
        </div>
        <p className={`text text_type_main-default ${styles.secondary}`}>
          { user.name ? user.name : 'Личный кабинет'}
        </p>
      </Link>
    </header>
  );
}

export default AppHeader;
