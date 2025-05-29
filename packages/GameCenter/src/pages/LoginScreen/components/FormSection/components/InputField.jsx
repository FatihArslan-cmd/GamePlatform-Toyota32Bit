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

  const renderRightIcon = () => {
    if (value && value.length > 0) {
      return (
        <TextInput.Icon
          icon="close" 
          onPress={() => onChangeText('')} 
          color={primaryColor}
        />
      );
    }
    else if (rightIcon) {
      return (
        <TextInput.Icon
          icon={rightIcon}
          onPress={onRightIconPress}
          color={primaryColor}
        />
      );
    }
    return null;
  };


  return (
    <TextInput
      mode="flat"
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={style}
      contentStyle={{ fontFamily: "Orbitron-ExtraBold" }}
      left={leftIcon ? <TextInput.Icon icon={leftIcon} color={primaryColor} /> : null}
      right={renderRightIcon()}
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