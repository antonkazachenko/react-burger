import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import IngredientTabs from '../ingredient-tabs/ingredient-tabs';
import IngredientsContext from '../../services/ingredientsContext';
import OrderContext from '../../services/orderContext';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientSection from '../ingredient-section/ingredient-section';
import Modal from '../modal/modal';

function BurgerIngredients({
  isVisible, modalData, handleModal, handleCloseModal,
}) {
  const { data } = useContext(IngredientsContext);
  const { orderData, setOrderData } = useContext(OrderContext);
  const bread = data.filter((el) => el.type === 'bun');
  const sauces = data.filter((el) => el.type === 'sauce');

  const breadClasses = [`ml-4 ${styles.relative}`, 'ml-6'];
  const saucesClasses = ['ml-4', 'ml-6', `ml-4 mt-8 ${styles.relative}`, 'ml-6 mt-8'];
  return (
    <article>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>
      <IngredientTabs />
      <div className={`${styles.overflow}`}>
        <IngredientSection items={bread} title="Булки" classes={breadClasses} handleModal={handleModal} />
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="mt-10">
          <IngredientSection items={sauces} title="Соусы" classes={saucesClasses} handleModal={handleModal} />
        </div>
        {
          isVisible
          && (
          <Modal onClose={handleCloseModal} className={styles.modalSize} title="Детали ингдредианта">
            <IngredientDetails data={modalData} />
          </Modal>
          )
        }
      </div>
    </article>
  );
}

BurgerIngredients.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  modalData: PropTypes.object,
  handleModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
