import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CURRENT_ITEM_OPEN, CURRENT_ITEM_CLOSE } from '../services/actions/ingredients';

function withModalControl(Component) {
  return function WithModalControl(props) {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);

    const handleModal = (item) => {
      setIsVisible(true);
      if (item && item.data) {
        dispatch({ type: CURRENT_ITEM_OPEN, payload: item.data });
      }
    };
    const handleCloseModal = () => {
      setIsVisible(false);
      dispatch({ type: CURRENT_ITEM_CLOSE });
    };

    return (
      <Component
      /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
        isVisible={isVisible}
        modalData={modalData}
        handleModal={handleModal}
        handleCloseModal={handleCloseModal}
      />
    );
  };
}

withModalControl.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  Component: PropTypes.object.isRequired,
};

export default withModalControl;
