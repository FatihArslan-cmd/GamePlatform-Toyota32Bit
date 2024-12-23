import React, { createContext, useState, useEffect } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSendCodeWithCountdown = (onSendCode) => {
    if (countdown === 0) {
      setCountdown(30);
      onSendCode();
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <FormContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        rememberMe,
        setRememberMe,
        isForgotPassword,
        setIsForgotPassword,
        countdown,
        setCountdown,
        isModalVisible,
        setModalVisible,
        handleSendCodeWithCountdown,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
