import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
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

function IngredientTabs({ activeTab, onTabChange }) {
  return (
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
}

IngredientTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default IngredientTabs;
