import React, { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../hooks';
import styles from './burger-ingredients.module.css';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import IngredientSection from '../ingredient-section/ingredient-section';
import { useLanguage } from '../../utils/languageContext';

type TBurgerIngredientsProp = {
  handleModal: () => void;
}

const BurgerIngredients: FC<TBurgerIngredientsProp> = ({ handleModal }) => {
  const { t } = useLanguage();
  const { ingredients } = useSelector((store) => store.ingredientsStore);
  const [activeTab, setActiveTab] = React.useState('one');
  const bread = ingredients.filter((el) => el.type === 'bun');
  const sauces = ingredients.filter((el) => el.type === 'sauce');
  const main = ingredients.filter((el) => el.type === 'main');

  const [breadRef, breadInView] = useInView({ threshold: 0.02 });
  const [saucesRef, saucesInView] = useInView({ threshold: 0.33 });
  const [mainRef, mainInView] = useInView({ threshold: 0.65 });

  const breadClasses = [`ml-4 ${styles.relative} ${styles.noMobileLeft}`, `ml-6 ${styles.mobileLeft}`];
  const saucesClasses = [`ml-4 ${styles.noMobileLeft}`, `ml-6 ${styles.mobileLeft}`, `ml-4 mt-8 ${styles.noMobileLeft}`, `ml-6 mt-8 ${styles.mobileLeft}`];
  const mainClasses = [`ml-4 ${styles.noMobileLeft}`, `ml-6 ${styles.mobileLeft}`, `ml-4 mt-8 ${styles.noMobileLeft}`, `ml-6 mt-8 ${styles.mobileLeft}`, `ml-4 mt-8 ${styles.noMobileLeft}`, `ml-6 mt-8 ${styles.mobileLeft}`, `ml-4 mt-8 ${styles.noMobileLeft}`, `ml-6 mt-8 ${styles.mobileLeft}`, `ml-4 mt-8 ${styles.noMobileLeft}`];

  React.useEffect(() => {
    if (breadInView) setActiveTab('one');
    else if (saucesInView) setActiveTab('two');
    else setActiveTab('three');
  }, [breadInView, mainInView, saucesInView]);

  return (
    <article>
      <p className={`text text_type_main-large mt-10 ${styles.mobileCreateBurgerText}`}>{t('assembleBurger')}</p>
      <IngredientTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className={`${styles.overflow}`}>
        <div ref={breadRef}>
          <IngredientSection items={bread} title={t('buns')} classes={breadClasses} handleModal={handleModal} />
        </div>
        <div className="mt-10" ref={saucesRef}>
          <IngredientSection items={sauces} title={t('sauces')} classes={saucesClasses} handleModal={handleModal} />
        </div>
        <div className="mt-10" ref={mainRef}>
          <IngredientSection items={main} title={t('fillings')} classes={mainClasses} handleModal={handleModal} />
        </div>

      </div>
    </article>
  );
};

export default BurgerIngredients;
