import { createNavigationContainerRef } from "@react-navigation/native";

const navigationRef = createNavigationContainerRef();
const pendingNavigations = []; 
let isNavigationReady = false;

const processPendingNavigations = () => {
    while (pendingNavigations.length > 0) {
        const { name, params } = pendingNavigations.shift();
        if (navigationRef.isReady()) { 
            navigationRef.navigate(name, params);
        } else {
             pendingNavigations.unshift({ name, params });
             break;
        }
    }
};

const navigate = (name, params) => {
  if (isNavigationReady && navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    pendingNavigations.push({ name, params });
  }
};

const setReady = () => {
    isNavigationReady = true;
    if (navigationRef.isReady()) {
        processPendingNavigations();
    } else {
         const unsubscribe = navigationRef.current?.addListener('state', () => {
             if(navigationRef.isReady()){
                processPendingNavigations();
                unsubscribe();
             }
         });
    }
};

export default {
  navigate,
  navigationRef,
  setReady 
};