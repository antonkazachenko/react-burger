import React from "react";
import ConstructorCard from "../constructor-card/constructor-card";
import styles from "./burger-ingredients.module.css"
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import PropTypes from "prop-types";
function  BurgerIngredients({ bread, sauces, modalClick }) {
  return (
    <article>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>
      <IngredientTabs />
      <div className={`${styles.overflow}`}>
        <p className="text text_type_main-medium ">
          Булки
        </p>
        <article className={`${styles.flex} mt-6`} >
          {
            bread.map(el => {
              return (
                <ConstructorCard onClick={modalClick} className={el.class} counterCheck={el.counterCheck} item={el.item} price={el.price} />
              )
            })
          }
        </article>
        <p className="text text_type_main-medium mt-10">
          Соусы
        </p>
        <article className={`${styles.flex} mt-6 mb-4`}>
          {
            sauces.map(el => {
              return (
                <ConstructorCard onClick={modalClick} className={el.class} counterCheck={el.counterCheck} item={el.item} price={el.price} />
              )
            })
          }
        </article>
      </div>
    </article>
  )
}

BurgerIngredients.propTypes = {
  bread: PropTypes.arrayOf(PropTypes.shape({
      class: PropTypes.string.isRequired,
      counterCheck: PropTypes.bool.isRequired,
      item: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
  sauces: PropTypes.arrayOf(PropTypes.shape({
      class: PropTypes.string.isRequired,
      counterCheck: PropTypes.bool.isRequired,
      item: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
  modalClick: PropTypes.func.isRequired,
  };

export default BurgerIngredients;