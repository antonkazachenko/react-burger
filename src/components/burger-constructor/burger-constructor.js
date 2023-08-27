import React from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css"

function BurgerConstructor(props) {
  const {ingredients, className} = props;
  return (
      <div style={{ display: 'flex', flexDirection: 'column' }} className={className}>
        <div className={`${styles.dragElement} ml-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
            thumbnail={ingredients[0].image}
          />
        </div>
        <div className={styles.overflow}>
          <div className={`${styles.dragElement} mb-4`}>
            <div className="mr-2">
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              text={ingredients[5].name}
              price={30}
              thumbnail={ingredients[5].image}
            />
          </div>
          <div className={`${styles.dragElement} mb-4`}>
            <div className="mr-2">
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              text={ingredients[4].name}
              price={300}
              thumbnail={ingredients[4].image}
            />
          </div>
          <div className={`${styles.dragElement} mb-4`}>
            <div className="mr-2">
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              text={ingredients[7].name}
              price={80}
              thumbnail={ingredients[7].image}
            />
          </div>
          <div className={`${styles.dragElement} mb-4`}>
            <div className="mr-2">
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              text={ingredients[8].name}
              price={80}
              thumbnail={ingredients[8].image}
            />
          </div>
          <div className={`${styles.dragElement} mb-4`}>
            <div className="mr-2">
              <DragIcon type="primary"/>
            </div>
            <ConstructorElement
              text={ingredients[8].name}
              price={80}
              thumbnail={ingredients[8].image}
            />
          </div>
        </div>
        <div className={`${styles.dragElement} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail={ingredients[0].image}
          />
        </div>
        <div className={`${styles.dragElement} mr-4 mt-6 mt-10`}>
          <p className="text text_type_digits-medium mr-1">610</p>
          <div className="mr-10">
            <CurrencyIcon type="primary"/>
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
  )
}

export default BurgerConstructor;