import React, { memo } from "react";
import { TextInput } from "react-native-paper";
import { useTheme } from "../../../../../context/ThemeContext";

const InputField = memo(({
  label,
  value,
  onChangeText,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  textColor,
  isFormSectionInput,
}) => {
  const { colors } = useTheme(); 

  const primaryColor = isFormSectionInput ? '#8a2be2' : colors.primary;
  const placeholderColor = isFormSectionInput ? '#8a2be2' : colors.primary;


  return (
    <TextInput
      mode="flat"
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={style}
      contentStyle={{ fontFamily: "Orbitron-ExtraBold" }}
      left={<TextInput.Icon icon={leftIcon} color={primaryColor} />}
      right={
        rightIcon && (
          <TextInput.Icon
            icon={rightIcon}
            onPress={onRightIconPress}
            color={primaryColor}
          />
        )
      }
      theme={{
        colors: {
          primary: primaryColor, 
          placeholder: placeholderColor, 
          text: textColor || colors.text, 
        },
        fonts: {
          regular: { fontFamily: "Orbitron-ExtraBold" }
        }
      }}
    />
  );
});

export default InputField;