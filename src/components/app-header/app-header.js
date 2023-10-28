import React from 'react';
import {
  BurgerIcon, ListIcon, Logo, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './app-header.module.css';
import { getUserRequest } from '../../services/actions/account';

function AppHeader() {
  const { user } = useSelector((store) => store.accountStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccountClick = () => {
    dispatch(getUserRequest());
    if (user.name === '') {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  return (
    <header className={styles.navBar}>
      <nav className={`${styles.flexCentered} ${styles.navTab}`}>
        <div className={`${styles.flexCentered} mt-4 mb-4 p-5 mr-2`}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <NavLink to="/" href="#" className={styles.navLink}>
            {(window.location.pathname === '/') ? (
              <>
                <div className="mr-2">
                  <BurgerIcon type="primary" />
                </div>
                <p className="text text_type_main-default">
                  Конструктор
                </p>
              </>
            ) : (
              <>
                <div className="mr-2">
                  <BurgerIcon type="secondary" />
                </div>
                <p className={`text text_type_main-default ${styles.secondary}`}>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
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
      <nav onClick={handleAccountClick} className={`${styles.linkDecoration} ${styles.flexCentered} ${styles.navTab} ${styles.navRight} ${styles.navLink} mt-4 mb-4 p-5`}>
        <div className="mr-2">
          <ProfileIcon type="secondary" />
        </div>
        <p className={`text text_type_main-default ${styles.secondary}`}>
          { user.name ? user.name : 'Личный кабинет'}
        </p>
      </nav>
    </header>
  );
}

export default AppHeader;
