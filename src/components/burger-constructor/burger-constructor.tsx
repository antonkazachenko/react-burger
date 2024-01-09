import React, { FC, useEffect, useState } from 'react';
import {
  Button, CloseIcon, ConstructorElement, CurrencyIcon, DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {
  createOrderRequest,
  addIngredient,
  removeIngredient,
  changeBun,
  setTotalPrice,
  resetConstructor, TItemTypeWithUniqueId, onConstructorMobileSwitch,
} from '../../services/actions/ingredients';
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';
import { WithModalControlsReturn } from '../../hocs/with-modal-control';
import TItemType from '../../types/ItemType';
import { useLanguage } from '../../utils/languageContext';

type TBurgerConstructorProp = {
  className: string;
  handleCloseModal: () => void;
  handleModal: () => void;
}

const BurgerConstructor: FC<TBurgerConstructorProp & WithModalControlsReturn> = ({
  className, handleCloseModal, handleModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language, t } = useLanguage();
  const {
    constructorIngredients,
    bunData,
  } = useSelector((store) => store.ingredientsStore);
  const { name } = useSelector((store) => store.accountStore.user);
  const { totalPrice, onConstructorMobile } = useSelector((store) => store.ingredientsStore);

  const handleIngredientRemoval = (id: string | undefined): void => {
    if (typeof id === 'undefined') { return; }
    // eslint-disable-next-line no-underscore-dangle
    dispatch(removeIngredient(id));
  };

  const mobileSwitch = () => {
    dispatch(onConstructorMobileSwitch(!onConstructorMobile));
  };

  const handleCloseModalWithReset = (): void => {
    setIsVisible(false);
    handleCloseModal();
    dispatch(resetConstructor());
  };

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce'],
    drop(item: TItemType) {
      if (item && item.type === 'bun') {
        dispatch(changeBun(item));
      } else if (bunData !== null) {
        dispatch(addIngredient(item));
      }
    },
  });

  useEffect(() => {
    let totalPriceValue = 0;
    if (bunData) {
      totalPriceValue += bunData.price * 2;
    }
    if (constructorIngredients) {
      constructorIngredients.forEach((el: { ingredient: TItemTypeWithUniqueId }) => {
        totalPriceValue += el.ingredient.price;
      });
    }
    if (totalPriceValue === 0) {
      dispatch(setTotalPrice(0));
    } else {
      dispatch(setTotalPrice(totalPriceValue));
    }
  }, [bunData, constructorIngredients, dispatch]);

  const createOrder = (): void => {
    if (!name) {
      navigate('/login', { replace: true });
    }
    const ingredientsArray = [];
    if (!bunData || !name) { return; }
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    constructorIngredients.forEach((el) => {
      // eslint-disable-next-line no-underscore-dangle
      ingredientsArray.push(el.ingredient._id);
    });
    // eslint-disable-next-line no-underscore-dangle
    ingredientsArray.push(bunData._id);
    setIsVisible(true);
    dispatch(createOrderRequest(ingredientsArray));
    handleModal();
  };
  if (bunData === null) {
    return (
      <>
        <div className={styles.dropZone} ref={dropTarget} data-cy="drop-zone">
          <p className="text text_type_main-large mt-10">{t('moveTheBun')}</p>
        </div>
        <div>
          <div className={styles.mobileHeader}>
            <p className="text text_type_main-large">{t('order')}</p>
            <CloseIcon type="primary" onClick={mobileSwitch} />
          </div>
          <p className={`text text_type_main-medium mt-10 pl-2 pr-2 ${styles.defaultText}`}>{t('noIngredientsSelected')}</p>
        </div>
      </>
    );
  }
  const translatedBunNameWithBottom = language === 'en' ? `${t(bunData.name)} (bottom)` : `${bunData.name} (низ)`;
  const translatedBunNameWithTop = language === 'en' ? `${t(bunData.name)} (top)` : `${bunData.name} (верх)`;

  return (
    <>
      <div className={`${className} ${styles.desktop}`} ref={dropTarget} data-cy="drop-target">

        <div className={`${styles.dragElement} ml-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${translatedBunNameWithTop}`}
            price={bunData.price}
            thumbnail={bunData.image}
          />
        </div>
        {
          constructorIngredients && constructorIngredients.length ? (
            <div className={styles.overflow}>
              {constructorIngredients.map(
                (el, index) => {
                  if (el.ingredient.type !== 'bun') {
                    return (
                      <DraggableIngredient
                        /* eslint-disable-next-line no-underscore-dangle */
                        key={el.ingredient.uniqueId}
                        ingredient={el.ingredient}
                        handleIngredientRemoval={handleIngredientRemoval}
                        index={index}
                      />
                    );
                  }
                  return null;
                },
              )}
            </div>
          ) : null
        }
        <div className={`${styles.dragElement} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${translatedBunNameWithBottom}`}
            price={bunData.price}
            thumbnail={bunData.image}
          />
        </div>
        <div className={`${styles.dragElement} mr-4 mt-6 mt-10`}>
          <p className="text text_type_digits-medium mr-1">{Number.isNaN(totalPrice) ? 0 : totalPrice}</p>
          <div className="mr-10">
            <CurrencyIcon type="primary" />
          </div>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div onClick={createOrder} data-cy="order-button">
            <Button htmlType="button" type="primary" size="large">
              {t('createOrder')}
            </Button>
          </div>
          {
            isVisible
            && (
              <Modal onClose={handleCloseModalWithReset} className={styles.modalWidth} headerClass={`${styles.exitCross} mr-10 mt-15`}>
                <OrderDetails />
              </Modal>
            )
          }
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.mobileHeader}>
          <p className="text text_type_main-large">{t('order')}</p>
          <CloseIcon type="primary" onClick={mobileSwitch} />
        </div>
        <div>
          <div className={styles.draggableIngredientMobile}>
            <DragIcon type="primary" />
            <div className={styles.ingredientDataMobile}>
              <img className={styles.mobileImg} src={bunData.image_mobile} alt={bunData.name} />
              <p className="text text_type_main-small mt-1">{translatedBunNameWithTop}</p>
              <div className={styles.mobilePrice}>
                <p className="text text_type_digits-default">{bunData.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.draggableIngredientMobile}>
          <DragIcon type="primary" />
          <div className={styles.ingredientDataMobile}>
            <img className={styles.mobileImg} src={bunData.image_mobile} alt={bunData.name} />
            <p className="text text_type_main-small mt-1">{translatedBunNameWithBottom}</p>
            <div className={styles.mobilePrice}>
              <p className="text text_type_digits-default">{bunData.price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerConstructor;
