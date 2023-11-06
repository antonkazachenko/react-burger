import React, { FC } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useInView } from 'react-intersection-observer';
import styles from './burger-ingredients.module.css';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import IngredientSection from '../ingredient-section/ingredient-section';

type TBurgerIngredientsProp = {
  handleModal: () => void;
}

type TItemType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

const BurgerIngredients: FC<TBurgerIngredientsProp> = ({ handleModal }) => {
  // TODO: remove this any
  const { ingredients } = useSelector((store: any) => store.ingredientsStore);
  const [activeTab, setActiveTab] = React.useState('one');
  const bread = ingredients.filter((el: TItemType) => el.type === 'bun');
  const sauces = ingredients.filter((el: TItemType) => el.type === 'sauce');
  const main = ingredients.filter((el: TItemType) => el.type === 'main');

  const [breadRef, breadInView] = useInView({ threshold: 0.02 });
  const [saucesRef, saucesInView] = useInView({ threshold: 0.33 });
  const [mainRef, mainInView] = useInView({ threshold: 0.65 });

  const breadClasses = [`ml-4 ${styles.relative}`, 'ml-6'];
  const saucesClasses = ['ml-4', 'ml-6', 'ml-4 mt-8', 'ml-6 mt-8'];
  const mainClasses = ['ml-4', 'ml-6', 'ml-4 mt-8', 'ml-6 mt-8', 'ml-4 mt-8', 'ml-6 mt-8', 'ml-4 mt-8', 'ml-6 mt-8', 'ml-4 mt-8'];

  React.useEffect(() => {
    if (breadInView) setActiveTab('one');
    else if (saucesInView) setActiveTab('two');
    else setActiveTab('three');
  }, [breadInView, mainInView, saucesInView]);

  return (
    <article>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <IngredientTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={`${styles.overflow}`}>
        <div ref={breadRef}>
          <IngredientSection items={bread} title="Булки" classes={breadClasses} handleModal={handleModal} />
        </div>
        <div className="mt-10" ref={saucesRef}>
          <IngredientSection items={sauces} title="Соусы" classes={saucesClasses} handleModal={handleModal} />
        </div>
        <div className="mt-10" ref={mainRef}>
          <IngredientSection items={main} title="Начинки" classes={mainClasses} handleModal={handleModal} />
        </div>

      </div>
    </article>
  );
};

export default BurgerIngredients;
