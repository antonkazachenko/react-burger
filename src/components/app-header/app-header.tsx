import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BurgerIcon, ListIcon, Logo, MenuIcon, ProfileIcon, CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import styles from './app-header.module.css';
import { getUserRequest, mobileMenuCloseAction, mobileMenuOpenAction } from '../../services/actions/account';
import LanguageSwitcher from '../language-switcher/language-switcher';
import { useLanguage } from '../../utils/languageContext';
import { ReactComponent as MobileLogo } from '../../images/mobileLogo.svg';

const AppHeader: FC<object> = () => {
  const { user } = useSelector((store) => store.accountStore);
  const { onConstructorMobile } = useSelector((store) => store.ingredientsStore);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mobileMenu } = useSelector((store) => store.accountStore);
  const toggleMenu = () => {
    if (mobileMenu === 'close') {
      dispatch(mobileMenuOpenAction());
    } else {
      dispatch(mobileMenuCloseAction());
    }
  };

  const handleAccountClick = (): void => {
    dispatch(getUserRequest());
    if (user.name === '') {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  return (
    <>
      <div className={`${styles.bg} ${onConstructorMobile ? styles.mobileNone : null}`} data-cy="header">
        <div className={styles.app}>
          <header className={styles.navBar}>
            <div className={`${styles.flex} ${styles.navSide} ${styles.navLeft}`}>
              <nav className={`${styles.flexCentered} ${styles.navTab}`}>
                <div className={`${styles.flexCentered} mt-4 mb-4 p-5 mr-2`}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <NavLink to="/" replace className={styles.navLink}>
                    {(window.location.href.slice(-1) === '/') ? (
                      <>
                        <div className="mr-2">
                          <BurgerIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default">
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          {t('headerConstructor')}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="mr-2">
                          <BurgerIcon type="secondary" />
                        </div>
                        <p className={`text text_type_main-default ${styles.secondary}`}>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          {t('headerConstructor')}
                        </p>
                      </>
                    )}
                  </NavLink>
                </div>
                <div className={`${styles.flexCentered} mt-4 mb-4 p-5`}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <NavLink to="/feed" replace className={styles.navLink}>
                    {(window.location.href.includes('/feed') || window.location.hash.includes('feed')) ? (
                      <>
                        <div className="mr-2">
                          <ListIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default">
                          {t('headerFeed')}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="mr-2">
                          <ListIcon type="secondary" />
                        </div>
                        <p className={`text text_type_main-default ${styles.secondary}`}>
                          {t('headerFeed')}
                        </p>
                      </>
                    )}
                  </NavLink>
                </div>
              </nav>
            </div>
            <div className={styles.logo}>
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <div className={styles.mobileLogo}>
              {
                mobileMenu === 'open' ? <p className="text text_type_main-large">Menu</p> : (
                  <Link to="/">
                    <MobileLogo />
                  </Link>
                )
              }
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div onClick={toggleMenu}>
                <motion.div
                  animate={mobileMenu === 'open' ? { opacity: 1, rotate: 0 } : { opacity: 1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className={styles.motionCross}
                >
                  {mobileMenu === 'open' ? <CloseIcon type="secondary" /> : <MenuIcon type="secondary" />}
                </motion.div>
              </div>

            </div>
            <div className={`${styles.flex} ${styles.navSide} ${styles.navRight}`}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <nav
                onClick={handleAccountClick}
                className={`${styles.linkDecoration} ${styles.flexCentered} ${styles.navTab} ${styles.navRight} ${styles.navLink} mt-4 mb-4 p-5`}
              >
                {(window.location.href.includes('profile') || window.location.hash.includes('profile')
                  || window.location.hash.includes('login') || window.location.href.includes('login')
                  || window.location.hash.includes('forgot-password') || window.location.href.includes('forgot-password')
                  || window.location.hash.includes('register') || window.location.href.includes('register')
                  || window.location.hash.includes('reset-password') || window.location.href.includes('reset-password'))
                  ? (
                    <>
                      <div className="mr-2">
                        <ProfileIcon type="primary" />
                      </div>
                      <p className="text text_type_main-default">
                        {user.name ? user.name : t('headerProfile')}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mr-2">
                        <ProfileIcon type="secondary" />
                      </div>
                      <p className={`text text_type_main-default ${styles.secondary}`}>
                        {user.name ? user.name : t('headerProfile')}
                      </p>
                    </>
                  )}
              </nav>
              <LanguageSwitcher />
            </div>
          </header>
        </div>
      </div>
      {
        mobileMenu === 'open' ? (
          <div>
            <ul>
              <li>
                <p className="text text_type_main-small">Личный кабинет</p>
              </li>
              <li>
                <p className="text text_type_main-small">Конструктор бургеров</p>
              </li>
              <li>
                <p className="text text_type_main-small">Лента заказов</p>
              </li>
            </ul>
          </div>
        ) : null

      }
    </>
  );
};

export default AppHeader;
