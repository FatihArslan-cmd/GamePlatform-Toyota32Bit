import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const RoomsScreen = () => {
  const [state, setState] = React.useState({ open: false });
 const navigation = useNavigation();
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Rooms Sayfası</Text>
      </View>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'star',
              label: 'Star',
              onPress: () => navigation.navigate('CreateRoom'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RoomsScreen;