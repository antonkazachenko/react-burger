import React from 'react';
import PropTypes from 'prop-types';
import ConstructorCard from '../constructor-card/constructor-card';
import styles from './ingredient-section.module.css';

function IngredientSection({
  items, title, classes, handleModal,
}) {
  return (
    <>
      <p className="text text_type_main-medium ">
        {title}
      </p>
      <article className={`${styles.flex} mt-6`}>
        {
          items.map((el, index) => (
            <ConstructorCard
              onClick={handleModal}
              className={classes[index]}
              item={el}
              price={el.price}
              /* eslint-disable-next-line no-underscore-dangle */
              key={el._id}
            />
          ))
        }
      </article>
    </>
  );
}

IngredientSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.array.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default IngredientSection;
