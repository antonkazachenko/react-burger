import React from "react";
import {Counter, Tab,} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorCard from "../constructor-card/constructor-card";
import data from "../../utils/data";
import styles from "./burger-ingredients.module.css"

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one')
  return (
    <article>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>
      <nav style={{display: 'flex'}} className={`${styles.justifyCenter} mt-5`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <div className={styles.overflow}>
        <p className="text text_type_main-medium mt-10">
          Булки
        </p>
        <article className={`${styles.flex} mt-6`}>
          {/*TODO: Add Counter component*/}
          <ConstructorCard className={`ml-4 ${styles.relative}`} counterCheck={true} item={data[0]} price={20} />
          <ConstructorCard className="ml-6" item={data[data.length - 1]} price={20} />
        </article>
        <p className="text text_type_main-medium mt-10">
          Соусы
        </p>
        <article className={`${styles.flex} mt-6 mb-4`}>
          <ConstructorCard className="ml-4" item={data[3]} price={30}/>
          <ConstructorCard className="ml-6" item={data[6]} price={30}/>
          <ConstructorCard className={`ml-4 mt-8 ${styles.relative}`} price={30} counterCheck item={data[5]}/>
          <ConstructorCard className="ml-6 mt-8" price={30} item={data[9]}/>
        </article>
      </div>
    </article>
  )
}

export default BurgerIngredients;