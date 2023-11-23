import React, { FC, useEffect } from 'react';
import {
  BurgerIcon, ListIcon, Logo, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import styles from './app-header.module.css';
import { getUserRequest } from '../../services/actions/account';

const AppHeader: FC<void> = () => {
  // TODO: remove this any
  const { user } = useSelector((store) => store.accountStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccountClick = (): void => {
    // TODO: remove this ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getUserRequest());
    if (user.name === '') {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  useEffect(() => {
    // TODO: remove this ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getUserRequest());
  }, [dispatch]);

  return (
    <div className={styles.bg}>
      <div className={styles.app}>
        <header className={styles.navBar}>
          <nav className={`${styles.flexCentered} ${styles.navTab}`}>
            <div className={`${styles.flexCentered} mt-4 mb-4 p-5 mr-2`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <NavLink to="/" className={styles.navLink}>
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
                <div className={`${styles.secondary} mr-2`}>
                  <ListIcon type="secondary" />
                </div>
                <p className={`text text_type_main-default ${styles.secondary}`}>
                  Лента заказов
                </p>
              </a>
            </div>
          </nav>
          <div className={styles.logo}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <nav onClick={handleAccountClick} className={`${styles.linkDecoration} ${styles.flexCentered} ${styles.navTab} ${styles.navRight} ${styles.navLink} mt-4 mb-4 p-5`}>
            {(window.location.href.includes('profile')) ? (
              <>
                <div className="mr-2">
                  <ProfileIcon type="primary" />
                </div>
                <p className="text text_type_main-default">
                  { user.name ? user.name : 'Личный кабинет'}
                </p>
              </>
            ) : (
              <>
                <div className="mr-2">
                  <ProfileIcon type="secondary" />
                </div>
                <p className={`text text_type_main-default ${styles.secondary}`}>
                  { user.name ? user.name : 'Личный кабинет'}
                </p>
              </>
            )}
          </nav>
        </header>
      </div>
    </div>
  );
};

export default AppHeader;
