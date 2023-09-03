import React from "react";
import ConstructorCard from "../constructor-card/constructor-card";
import styles from "./burger-ingredients.module.css"
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import PropTypes from "prop-types";

function  BurgerIngredients({ bread, sauces, modalClick }) {
  const breadClasses = [`ml-4 ${styles.relative}`, "ml-6"]
  const saucesClasses = ["ml-4", "ml-6", `ml-4 mt-8 ${styles.relative}`, "ml-6 mt-8"]
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
            bread.map((el, index) => {
              return (
                <ConstructorCard onClick={modalClick} className={breadClasses[index]} item={el}
                                 price={el.price}/>
              )
            })
          }
        </article>
        <p className="text text_type_main-medium mt-10">
          Соусы
        </p>
        <article className={`${styles.flex} mt-6 mb-4`}>
          {
            sauces.map((el, index) => {
              return (
                <ConstructorCard onClick={modalClick} className={saucesClasses[index]} item={el}
                                 price={el.price}/>
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
      item: PropTypes.string.isRequired,
    })).isRequired,
  sauces: PropTypes.arrayOf(PropTypes.shape({
      item: PropTypes.string.isRequired,
    })).isRequired,
  modalClick: PropTypes.func.isRequired,
  };

export default BurgerIngredients;