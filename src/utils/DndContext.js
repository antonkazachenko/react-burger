import { HTML5Backend } from 'react-dnd-html5-backend';

const ModifiedBackend = (...args) => {
  const instance = new HTML5Backend(...args);

  // Fix Chrome 59 not sending a DragEnd after Drop, which other browsers do and react-dnd expects
  const originalTopDrop = instance.handleTopDrop;
  const originalTopDragEndCapture = instance.handleTopDragEndCapture;
  let dragEndTimeout;
  // eslint-disable-next-line no-shadow
  instance.handleTopDrop = (e, ...args) => {
    dragEndTimeout = setTimeout(() => {
      originalTopDragEndCapture(e, ...args);
    }, 0);
    originalTopDrop(e, ...args);
  };
  // eslint-disable-next-line no-shadow
  instance.handleTopDragEndCapture = (e, ...args) => {
    clearTimeout(dragEndTimeout);
    originalTopDragEndCapture(e, ...args);
  };

  return instance;
};

export default ModifiedBackend;
