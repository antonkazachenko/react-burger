import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
  image_large: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});

export default ingredientType;
