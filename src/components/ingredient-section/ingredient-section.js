import React from "react";
import ConstructorCard from "../constructor-card/constructor-card";
import styles from "./ingredient-section.module.css"


const IngredientSection = ({items, title, classes, handleModal}) => {
  return (
    <>
      <p className="text text_type_main-medium ">
        {title}
      </p>
      <article className={`${styles.flex} mt-6`} >
        {
          items.map((el, index) => {
            return (
              <ConstructorCard onClick={handleModal} className={classes[index]} item={el}
                               price={el.price}/>
            )
          })
        }
      </article>
    </>
  )
}

export default IngredientSection;