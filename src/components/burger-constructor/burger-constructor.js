import React, {useContext} from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css"
import { IngredientsContext } from "../../services/ingredientsContext";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ className, isVisible, handleModal, handleCloseModal }) {
  const ingredientsDisplay = useContext(IngredientsContext);
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
          {
            ingredientsDisplay.slice(1).map((el, index) => {
              if (el.type !== "bun" ){
                return (
                  <div className={`${styles.dragElement} mb-4`} key={index}>
                    <div className="mr-2">
                      <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image}
                    />
                  </div>
                );
              }
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
  className: PropTypes.string.isRequired,
};

export default BurgerConstructor;