import React from 'react';
import { TextInput } from 'react-native-paper';

const InputField = React.memo(({ 
  label,
  value,
  onChangeText,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  textColor,
}) => {
  console.log("InputField component rendered"); 
  return (
    <TextInput
      mode="flat"
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={style}
      contentStyle={{ fontFamily: "Orbitron-ExtraBold" }}
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
      theme={{
        colors: { primary: '#8a2be2', placeholder: '#8a2be2', text: textColor || '#fff' },
        fonts: {
          regular: { fontFamily: "Orbitron-ExtraBold" }
        }
      }}
    />
  );
});

export default InputField;