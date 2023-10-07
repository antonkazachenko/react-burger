import React from "react";

const withModalControl = (Component) => {
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
        {...props}
        isVisible={isVisible}
        modalData={modalData}
        handleModal={handleModal}
        handleCloseModal={handleCloseModal}
      />
    );
  };
}

export default withModalControl;