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
  textColor, // Yeni textColor prop'u eklendi
}) => (
  
  <TextInput
    mode="flat"
    label={label}
    value={value}
    fontFamily={"Orbitron-ExtraBold"}                        
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
    theme={{fonts: { bold: "Orbitron-ExtraBold" }, colors: { primary: '#8a2be2', placeholder: '#8a2be2', text: textColor || '#fff' } }} // textColor prop'unu kullandık
  />
);

export default InputField;