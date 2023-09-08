import React, {useContext, useEffect} from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css"
import {IngredientsContext} from "../../services/ingredientsContext";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({className, isVisible, handleModal, handleCloseModal}) {
  const {data, totalPriceDispatcher, totalPrice} = useContext(IngredientsContext);
  const [modalData, setModalData] = React.useState(null);

  useEffect(() => {
    let accumulatedPrice = data.reduce((acc, el) => {
      return (el.type !== "bun") ? acc + el.price : acc;
    }, 0);
    accumulatedPrice += data[0].price * 2;
    totalPriceDispatcher({type: "set", payload: accumulatedPrice});
  });

  const createOrder = () => {
    let ingredientsArray = [];
    data.forEach((el) => {
      ingredientsArray.push(el._id);
    });
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        ingredients: ingredientsArray,
      }),
    })
      .then(r =>
        r.ok ? r.json() : Promise.reject(r)
      )
      .then((res) => {
        console.log(res);
        setModalData(res);
        handleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (<div className={className}>
      <div className={`${styles.dragElement} ml-8 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={styles.overflow}>
        {
          data.slice(1).map((el, index) => {
            if (el.type !== "bun") {
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
            return null;
          })}
      </div>
      <div className={`${styles.dragElement} ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${styles.dragElement} mr-4 mt-6 mt-10`}>
        <p className="text text_type_digits-medium mr-1">{totalPrice.price}</p>
        <div className="mr-10">
          <CurrencyIcon type="primary"/>
        </div>
        <div onClick={createOrder}>
            <Button htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        {
          isVisible &&
          <OrderDetails modalData={modalData} onClose={handleCloseModal}/>
        }
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BurgerConstructor;