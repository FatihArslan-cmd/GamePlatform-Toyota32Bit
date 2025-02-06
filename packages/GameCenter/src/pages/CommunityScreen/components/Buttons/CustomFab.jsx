import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CustomFAB = () => {
  const [state, setState] = React.useState({ open: false });
  const navigation = useNavigation();
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={'plus'}
        actions={open ? [
          {
            icon: 'pencil-plus-outline',
            label: 'Create Room',
            onPress: () => navigation.navigate('CreateRoom'),
          },
        ] : []}
        onStateChange={onStateChange}
        onPress={() => {}} // You can remove the onPress if you don't need any action on main FAB press when open
      />
    </Portal>
  );
};

export default CustomFAB;