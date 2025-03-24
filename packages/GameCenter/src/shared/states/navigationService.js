import { createNavigationContainerRef } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export default {
  navigate,
  navigationRef
};