import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../ingredient-tabs/ingredient-tabs.module.css";

function IngredientTabs(props) {
  const {tabs} = props;
  const [current, setCurrent] = React.useState('one')
  return (
    <nav className={`${styles.justifyCenter} ${styles.flex} mt-5 mb-10`}>
      {
        tabs.map((el) => {
          return (
            <Tab value={el.index} active={current === el.index} onClick={setCurrent}>
              {el.name}
            </Tab>
          )
        })
      }
    </nav>
  )
}

export default IngredientTabs;