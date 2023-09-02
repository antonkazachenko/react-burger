import React from "react";
import ConstructorCard from "../constructor-card/constructor-card";
import styles from "./burger-ingredients.module.css"
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import bread from "../../utils/bread";
import sauces from "../../utils/sauces";

function BurgerIngredients({ bread, sauces }) {
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
        <article className={`${styles.flex} mt-6`}>
          {
            bread.map(el => {
              return (
                <ConstructorCard className={el.class} counterCheck={el.counterCheck} item={el.item} price={el.price} />
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
                <ConstructorCard className={el.class} counterCheck={el.counterCheck} item={el.item} price={el.price} />
              )
            })
          }
        </article>
      </div>
    </article>
  )
}

export default BurgerIngredients;