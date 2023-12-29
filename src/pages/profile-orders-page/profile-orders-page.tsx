import React, { FC, useEffect } from 'react';
import {
  Link, NavLink, useLocation, useNavigate,
} from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import { useDispatch, useSelector } from '../../hooks';
import styles from './profile-orders-page.module.css';
import { logoutRequest } from '../../services/actions/account';
import UserOrdersFeed from '../../components/user-orders-feed/user-orders-feed';
import withModalControl from '../../hocs/with-modal-control';
import { getCookie } from '../../utils/cookie';
import {
  userOrderFeedConnect,
  userOrderFeedDisconnect,
} from '../../services/actions/user-order-feed';
import { TOrder } from '../../services/reducers/order-feed';
import WebsocketStatus from '../../types/websocket';
import { useLanguage } from '../../utils/languageContext';

const UserOrdersFeedWithModal = withModalControl(UserOrdersFeed);

const ProfileOrdersPage: FC<object> = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((store) => store.userOrderFeedStore);
  const { ingredients } = useSelector((store) => store.ingredientsStore);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const calculateTotalPrice = (order: TOrder) => {
    // eslint-disable-next-line no-underscore-dangle
    const orderIngredients = ingredients.filter((item) => order.ingredients.includes(item._id));
    return orderIngredients.reduce((acc, item) => acc + item.price, 0);
  };

  const findIngredientImages = (order: TOrder) => order.ingredients.map((ingredientId) => {
    // eslint-disable-next-line no-underscore-dangle
    const ingredient = ingredients.find((item) => item._id === ingredientId);
    return ingredient ? ingredient.image : '';
  });

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

  if (status !== WebsocketStatus.ONLINE) {
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
                  {t('profile')}
                </p>
              )}
            </NavLink>
            <NavLink
              className={`${styles.menuTab} ${styles.linkDecoration}`}
              to="/profile/orders"
            >
              {({ isActive }) => (
                <p className={`text text_type_main-large ${isActive ? styles.activeColor : 'text_color_inactive'}`}>
                  {t('orderHistory')}
                </p>
              )}
            </NavLink>
            <Link onClick={handleLogout} className={`${styles.menuTab} ${styles.linkDecoration}`} to="/" replace>
              <p className="text text_type_main-large text_color_inactive">
                {t('logout')}
              </p>
            </Link>
          </div>
          <div className={styles.spinner}>
            <MoonLoader
              color="rgb(133, 133, 173, 1)"
              cssOverride={{}}
              loading
              size={100}
              speedMultiplier={1}
            />
          </div>
        </div>
      </div>
    );
  }

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
                {t('profile')}
              </p>
            )}
          </NavLink>
          <NavLink
            className={`${styles.menuTab} ${styles.linkDecoration}`}
            to="/profile/orders"
          >
            {({ isActive }) => (
              <p className={`text text_type_main-large ${isActive ? styles.activeColor : 'text_color_inactive'}`}>
                {t('orderHistory')}
              </p>
            )}
          </NavLink>
          <Link onClick={handleLogout} className={`${styles.menuTab} ${styles.linkDecoration}`} to="/" replace>
            <p className="text text_type_main-large text_color_inactive">
              {t('logout')}
            </p>
          </Link>
        </div>
        <div className={`${styles.cardFlex} ${styles.overflow} ml-15 mt-10`}>
          {orders.map((order) => (
            // eslint-disable-next-line no-underscore-dangle
            <Link className={styles.link} to={`/profile/orders/${order.number}`} replace state={{ from: 'profileOrders', backgroundLocation: location }} key={order._id}>
              <UserOrdersFeedWithModal
                /* eslint-disable-next-line no-underscore-dangle */
                key={order._id}
                orderNumber={order.number}
                orderName={order.name}
                orderNameEn={order.nameEn}
                statusName={order.status}
                orderPrice={calculateTotalPrice(order)}
                ingredientImages={findIngredientImages(order)}
                date={order.createdAt}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOrdersPage;
