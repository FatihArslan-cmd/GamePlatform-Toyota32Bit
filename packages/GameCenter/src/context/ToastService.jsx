import React from "react";
import ToastMessage from "../components/ToastMessage/Toast";
import { View } from "react-native";

let toastRef; 
let isToastVisible = false; 

const ToastProvider = ({ children }) => {
  toastRef = React.useRef(null);

  return (
    <>
      {children}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000000, alignItems: 'center' }}>
        <ToastMessage ref={toastRef} onVisibilityChange={(visible) => isToastVisible = visible} />
      </View>
    </>
  );
};

const ToastService = {
  show: (type = "info", message = "", action) => {
    if (toastRef && toastRef.current) {
      toastRef.current.hideToast(() => { 
        toastRef.current.showToast(type, message, action); 
      });
    } 
  },
  hide: () => {
    if (toastRef && toastRef.current) {
      toastRef.current.hideToast();
    }
  },
};

export { ToastService, ToastProvider };