import React from 'react';
import PropTypes from 'prop-types';

function withModalControl(Component) {
  return function WithModalControl(props) {
    const [isVisible, setIsVisible] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);

    const handleModal = (item) => {
      setIsVisible(true);
      if (item && item.data) {
        setModalData(item.data);
      }
    };
    const handleCloseModal = () => {
      setIsVisible(false);
      setModalData(null);
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
