import { useState, useCallback } from 'react';

const useModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const showModal = useCallback((type, title, message) => {
      setModalType(type);
      setModalTitle(title);
      setModalMessage(message);
      setModalVisible(true);
    }, []);


    const closeModal = useCallback(() => {
      setModalVisible(false);
    }, []);
  
    return {
      modalVisible,
      modalType,
      modalMessage,
      modalTitle,
      showModal,
      closeModal
    };
  };

export default useModal;