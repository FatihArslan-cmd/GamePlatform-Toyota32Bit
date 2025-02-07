import React from 'react';
import CustomModal from '../components/CustomModal'; // Path to your CustomModal component
import { View } from 'react-native';

let modalRef; // Ref for the CustomModal

const ModalProvider = ({ children }) => {
  modalRef = React.useRef(null);

  return (
    <>
      {children}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, alignItems: 'center', justifyContent: 'center' }}>
        <CustomModal ref={modalRef} />
      </View>
    </>
  );
};

const ModalService = {
  showModal: (config) => {
    if (modalRef && modalRef.current) {
      modalRef.current.showModal(config);
    } else {
      console.warn("Modal ref is not yet attached. Modal cannot be shown.");
    }
  },
  hideModal: () => {
    if (modalRef && modalRef.current) {
      modalRef.current.hideModal();
    }
  },
};

export { ModalService, ModalProvider };