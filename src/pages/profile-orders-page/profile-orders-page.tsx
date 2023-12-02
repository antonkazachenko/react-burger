import React, { FC, useEffect } from 'react';
import {
  Link, NavLink, useLocation, useNavigate,
} from 'react-router-dom';
import { useDispatch } from '../../hooks';
import styles from './profile-orders-page.module.css';
import { logoutRequest } from '../../services/actions/account';
import UserOrdersFeed from '../../components/user-orders-feed/user-orders-feed';
import withModalControl from '../../hocs/with-modal-control';
import { getCookie } from '../../utils/cookie';
import { userOrderFeedConnect, userOrderFeedDisconnect } from '../../services/actions/user-order-feed';
// import { TOrder } from '../../services/reducers/order-feed';

const UserOrdersFeedWithModal = withModalControl(UserOrdersFeed);

const ProfileOrdersPage: FC<object> = () => {
  const dispatch = useDispatch();
  // const { orders } = useSelector((store) => store.userOrderFeedStore);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //     dispatch(orderFeedConnect('wss://norma.nomoreparties.space/orders/all'));
  //     return () => {
  //       dispatch(orderFeedDisconnect());
  //     };
  //   }, [dispatch]);

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (accessToken === undefined) {
      navigate('/login', { replace: true });
      return;
    }

    const token = accessToken.replace(/^Bearer\s/, '');
    dispatch(userOrderFeedConnect(`wss://norma.nomoreparties.space/orders?token=${token}`));

    // eslint-disable-next-line consistent-return
    return () => {
      dispatch(userOrderFeedDisconnect());
    };
  }, [dispatch, navigate]);
  const handleLogout = (): void => {
    dispatch(logoutRequest());
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.app}>
      <div className={styles.flex}>
        <div>
          <NavLink
            className={`${styles.menuTab} mt-30 ${styles.linkDecoration}`}
            to="/profile"
          >
            {({ isActive }) => (
              <p className={`text text_type_main-large ${(isActive && !window.location.href.includes('orders')) ? styles.activeColor : 'text_color_inactive'}`}>
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
          <Link onClick={handleLogout} className={`${styles.menuTab} ${styles.linkDecoration}`} to="/" replace>
            <p className="text text_type_main-large text_color_inactive">
              Выйти
            </p>
          </Link>
        </div>
        <div className={`${styles.cardFlex} ${styles.overflow} ml-15 mt-10`}>
          <Link to={`profile/orders/${27905}`} state={{ backgroundLocation: location }}>
            <UserOrdersFeedWithModal />
          </Link>
          <UserOrdersFeedWithModal />
          <UserOrdersFeedWithModal />
          <UserOrdersFeedWithModal />
          <UserOrdersFeedWithModal />
          <UserOrdersFeedWithModal />
        </div>
      </div>
    </div>
  );
};

export default ProfileOrdersPage;
