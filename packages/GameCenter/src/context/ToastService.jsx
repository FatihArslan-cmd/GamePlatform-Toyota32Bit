import React from 'react';
import ToastMessage from '../components/ToastMessage/Toast2';
import { View } from 'react-native';

let toastRef; // ToastMessage ref'ini tutacak değişken

const ToastProvider = ({ children }) => {
  toastRef = React.useRef(null);

  return (
    <>
      {children}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10000, alignItems: 'center' }}>
        <ToastMessage ref={toastRef} />
      </View>
    </>
  );
};

const ToastService = {
  show: (type = "info", message = "", action) => {
    if (toastRef && toastRef.current) {
      toastRef.current.showToast(type, message, action);
    } else {
      console.warn("Toast ref henüz ayarlanmamış. Toast gösterilemedi.");
    }
  },
  hide: () => {
    if (toastRef && toastRef.current) {
      toastRef.current.hideToast();
    }
  },
};

export { ToastService, ToastProvider };