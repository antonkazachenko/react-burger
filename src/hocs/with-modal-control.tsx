import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentItemOpen,
  setCurrentItemClose,
} from '../services/actions/ingredients';
import useModal from '../hooks/useModal';

export interface WithModalControlsReturn {
  isVisible: boolean;
  handleModal: () => void;
  handleCloseModal: () => void;
}

function withModalControl<P extends WithModalControlsReturn>(
  Component: React.ComponentType<P>,
) {
  return function WithModalControl(props: Omit<P, keyof WithModalControlsReturn>) {
    const dispatch = useDispatch();
    const { isModalOpen, openModal, closeModal } = useModal();
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
        {...props as P}
        handleModal={handleModal}
        handleCloseModal={handleCloseModal}
        isVisible={isModalOpen}
      />
    );
  };
}

export default withModalControl;
