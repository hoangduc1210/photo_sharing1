import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  const modalRoot = document.getElementById('modal');
  return modalRoot && createPortal(
    children,
    modalRoot
  );
};

export default Modal;