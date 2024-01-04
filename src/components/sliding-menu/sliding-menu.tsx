import React, { FC } from 'react';
import { motion } from 'framer-motion';

type TSlidingMenuProps = {
  isOpen: boolean;
  onClose: () => void;
}

const SlidingMenu: FC<TSlidingMenuProps> = ({ isOpen, onClose }) => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: isOpen ? 0 : '-100%' }}
    transition={{ type: 'spring', stiffness: 100 }}
    style={{
      position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'white',
    }}
  >
    {/* Menu content goes here */}
    {/* eslint-disable-next-line react/button-has-type */}
    <button onClick={onClose}>Close Menu</button>
  </motion.div>
);

export default SlidingMenu;
