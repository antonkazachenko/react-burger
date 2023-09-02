import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-card.module.css";
import PropTypes from "prop-types";

function ConstructorCard(props) {
  const {item, className, counterCheck, price, onClick} = props;

  function customClick() {
    onClick({data: item, isCheckout: false});
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

ConstructorCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string.isRequired,
  counterCheck: PropTypes.bool,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ConstructorCard;