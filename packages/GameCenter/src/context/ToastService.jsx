import React from 'react';
import ToastMessage from '../components/ToastMessage/Toast2';
import { View } from 'react-native';

let toastRef; // ToastMessage ref'ini tutacak değişken
let isToastVisible = false; // Toast'un görünür olup olmadığını takip eden değişken

const ToastProvider = ({ children }) => {
  toastRef = React.useRef(null);

  return (
    <>
      {children}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10000, alignItems: 'center' }}>
        <ToastMessage ref={toastRef} onVisibilityChange={(visible) => isToastVisible = visible} />
      </View>
    </>
  );
};

const ToastService = {
  show: (type = "info", message = "", action) => {
    if (toastRef && toastRef.current) {
      if (isToastVisible) {
        toastRef.current.hideToast(() => { // Mevcut toast varsa önce kapat
          toastRef.current.showToast(type, message, action); // Sonra yenisini göster
        });
      } else {
        toastRef.current.showToast(type, message, action); // Toast zaten görünür değilse direkt göster
      }
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