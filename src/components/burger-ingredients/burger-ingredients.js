import React, { useContext } from "react";
import styles from "./burger-ingredients.module.css"
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import { IngredientsContext } from "../../services/ingredientsContext";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientSection from "../ingredient-section/ingredient-section";

function  BurgerIngredients({ isVisible, modalData, handleModal, handleCloseModal }) {
  const { data } = useContext(IngredientsContext);
  const bread = data.filter((el) => el.type === "bun");
  const sauces = data.filter((el) => el.type === "sauce");

  const breadClasses = [`ml-4 ${styles.relative}`, "ml-6"]
  const saucesClasses = ["ml-4", "ml-6", `ml-4 mt-8 ${styles.relative}`, "ml-6 mt-8"]
  return (
    <article>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>
      <IngredientTabs />
      <div className={`${styles.overflow}`}>
        <IngredientSection items={bread} title="Булки" classes={breadClasses} handleModal={handleModal}/>
        <div className="mt-10">
          <IngredientSection items={sauces} title="Соусы" classes={saucesClasses} handleModal={handleModal}/>
        </div>
        {
          isVisible &&
          <IngredientDetails data={modalData}  onClose={handleCloseModal} />
        }
      </div>
    </article>
  )
}

export default BurgerIngredients;