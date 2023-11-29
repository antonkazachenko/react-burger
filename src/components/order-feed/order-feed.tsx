import React, { FC, useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-feed.module.css';
import { WithModalControlsReturn } from '../../hocs/with-modal-control';

type TOrderFeedProp = {
  handleModal: () => void;
  orderNumber: number;
  orderName: string;
  orderPrice: number;
  ingredientImages: string[];
}

const OrderFeed: FC<TOrderFeedProp & WithModalControlsReturn> = ({
  handleModal,
  orderNumber,
  orderName,
  orderPrice,
  ingredientImages,
}) => {
  const [dynamicBeforeStyle, setDynamicBeforeStyle] = useState('');

  useEffect(() => {
    if (ingredientImages.length > 5) {
      const randomUrl = ingredientImages.slice(5)[0];
      const uniqueClassName = `card-${orderNumber}-image-opacity`;

      const styleContent = `
        .${uniqueClassName}::before {
          background-image: url('${randomUrl}');
          // other styles for the ::before pseudo-element
        }
      `;

      setDynamicBeforeStyle(styleContent);
    }
  }, [ingredientImages, orderNumber]);

  return (
    <>
      {dynamicBeforeStyle && <style>{dynamicBeforeStyle}</style>}
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={`${styles.card} mt-5 mb-4 mr-2`} onClick={handleModal}>
        <div className={styles.cardHeader}>
          <p className="text text_type_digits-default">{`#${orderNumber}`}</p>
          <p className={`text text_type_main-small ${styles.date}`}>Сегодня, 16:20</p>
        </div>
        <div className="mt-6 mb-6">
          <p className="text text_type_main-medium">{orderName}</p>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.imagesContainer}>
            {
              ingredientImages.slice(0, 5).map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={`${styles.cardImages}`}
                  style={{
                    backgroundImage: `url(${item})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    zIndex: ingredientImages.length - index,
                    marginLeft: index === 0 ? '0px' : '-15px', // Conditional marginLeft
                  }}
                />
              ))
            }
            {ingredientImages.length > 5 && (
              <div className={`${styles.cardImageWithOpacity} ${styles.cardImages} card-${orderNumber}-image-opacity`}>
                <p className={`${styles.extraIngredientsTextColor} text text_type_digits-default`}>
                  +
                  {ingredientImages.length - 5}
                </p>
              </div>
            )}
          </div>
          <div className={styles.cardPrice}>
            <p className="text text_type_digits-default mr-2">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderFeed;
