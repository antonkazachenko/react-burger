import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-tabs.module.css';

const tabs = [
  {
    name: 'Булки',
    index: 'one',
  },
  {
    name: 'Соусы',
    index: 'two',
  }, {
    name: 'Начинки',
    index: 'three',
  }];

type TIngredientTabsProp = {
  activeTab: string;
  onTabChange: (index: string) => void;
}

const IngredientTabs: FC<TIngredientTabsProp> = ({ activeTab, onTabChange }) => (
  <nav className={`${styles.justifyCenter} ${styles.flex} mt-5 mb-10`}>
    {
        tabs.map((el) => (
          <Tab
            value={el.index}
            active={activeTab === el.index}
            key={el.index}
            onClick={() => {
              onTabChange(el.index);
            }}
          >
            {el.name}
          </Tab>
        ))
      }
  </nav>
);

export default IngredientTabs;
