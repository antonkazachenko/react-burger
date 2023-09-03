import React from "react";
import ConstructorCard from "../constructor-card/constructor-card";
import styles from "./burger-ingredients.module.css"
import IngredientTabs from "../ingredient-tabs/ingredient-tabs";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientSection from "../ingredient-section/ingredient-section";

function  BurgerIngredients({ data }) {
  const bread = data.filter((el) => el.type === "bun");
  const sauces = data.filter((el) => el.type === "sauce");
  const [isVisible, setIsVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const handleModal = (item) => {
    setIsVisible(true);
    setModalData(item.data);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setModalData(null);
  };

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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  })).isRequired,
};

export default BurgerIngredients;