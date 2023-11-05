import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentItemOpen,
  setCurrentItemClose,
} from '../services/actions/ingredients';
import useModal from '../hooks/useModal';

interface WithModalControlsReturn {
  isVisible: boolean;
  modalData: any;
  handleModal: (item: any) => void;
  handleCloseModal: () => void;
}

function withModalControl<P>(
  Component: React.ComponentType<P>,
): React.FC<P & WithModalControlsReturn> {
  return function WithModalControl(props) {
    const dispatch = useDispatch();
    const { isModalOpen, openModal, closeModal } = useModal();
    const [modalData] = React.useState(null);
    const navigate = useNavigate();

    // TODO: remove this any
    const handleModal = (item: any) => {
      openModal();
      if (item && item.data) {
        dispatch(setCurrentItemOpen(item.data));
      }
    };
    const handleCloseModal = () => {
      closeModal();
      dispatch(setCurrentItemClose());
      if (window.location.pathname !== '/') {
        navigate('/');
      }
    };

    return (
      <Component
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
        isVisible={isModalOpen}
        modalData={modalData}
        handleModal={handleModal}
        handleCloseModal={handleCloseModal}
      />
    );
  };
}

export default withModalControl;
