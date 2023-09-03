import React from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css"
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ ingredientsDisplay, className }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (<div className={className}>
        <div className={`${styles.dragElement} ml-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
            thumbnail={ingredientsDisplay[0].image}
          />
        </div>
        <div className={styles.overflow}>
          {ingredientsDisplay.slice(1).map(el => {
            return (<div className={`${styles.dragElement} mb-4`}>
                <div className="mr-2">
                  <DragIcon type="primary"/>
                </div>
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </div>);
          })}
        </div>
        <div className={`${styles.dragElement} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail={ingredientsDisplay[0].image}
          />
        </div>
        <div className={`${styles.dragElement} mr-4 mt-6 mt-10`}>
          <p className="text text_type_digits-medium mr-1">610</p>
          <div className="mr-10">
            <CurrencyIcon type="primary"/>
          </div>
          <div onClick={handleModal}>
            <Button htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
          {
            isVisible &&
            <OrderDetails onClose={handleCloseModal} />
          }
        </div>
      </div>
  )
}

BurgerConstructor.propTypes = {
  ingredientsDisplay: PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
  className: PropTypes.string.isRequired,
};

export default BurgerConstructor;