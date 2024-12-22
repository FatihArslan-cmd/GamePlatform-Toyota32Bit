import React from 'react';
import { TextInput } from 'react-native-paper';

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
}) => (
  <TextInput
    mode="outlined"
    label={label}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    style={style}
    left={<TextInput.Icon icon={leftIcon} color="#8a2be2" />}
    right={
      rightIcon && (
        <TextInput.Icon
          icon={rightIcon}
          onPress={onRightIconPress}
          color="#8a2be2"
        />
      )
    }
    theme={{ colors: { primary: '#8a2be2', placeholder: '#8a2be2', text: '#fff' } }}
    outlineColor="#8a2be250"
    activeOutlineColor="#8a2be2"
    textColor="#fff"
  />
);

export default InputField;
