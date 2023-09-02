import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-card.module.css";

function ConstructorCard(props) {
  const {item, className, counterCheck, price, onClick} = props;

  function customClick() {
    onClick(item);
  }

  return (
    <div className={`${styles.card} ${className}`} onClick={customClick}>
      <img className="pl-4 pr-4" src={item.image} alt={item.name}/>
      <div className={`${styles.flex} mt-1`}>
        <p className="text text_type_digits-default mr-1">
          {price}
        </p>
        <CurrencyIcon type={"primary"}/>
      </div>
      <p className={`text text_type_main-default mt-1 ${styles.textCenter}`}>
        {item.name}
      </p>
      { counterCheck && <Counter count={1} size="default" extraClass="m-1"/> }
    </div>
  )
}

ConstructorCard.defaultProps = {
  counterCheck: false,
}

export default ConstructorCard;