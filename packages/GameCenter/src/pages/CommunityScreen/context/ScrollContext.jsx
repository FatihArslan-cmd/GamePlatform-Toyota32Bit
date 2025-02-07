import React, { createContext, useContext } from 'react';

const ScrollContext = createContext(null);

const ScrollProvider = ({ children, scrollY }) => {
  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
};

const useScrollY = () => {
  return useContext(ScrollContext);
};

export { ScrollContext, ScrollProvider, useScrollY };