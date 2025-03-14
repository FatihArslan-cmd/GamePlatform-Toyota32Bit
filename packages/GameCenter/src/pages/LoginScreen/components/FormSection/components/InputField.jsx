import React from 'react';
import { TextInput } from 'react-native-paper';
import { useTheme } from '../../../../../context/ThemeContext'; // Import useTheme hook

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
  const { colors } = useTheme(); // Use the useTheme hook to access colors from context

  return (
    <TextInput
      mode="flat"
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={style}
      contentStyle={{ fontFamily: "Orbitron-ExtraBold" }}
      left={<TextInput.Icon icon={leftIcon} color={colors.primary} />}
      right={
        rightIcon && (
          <TextInput.Icon
            icon={rightIcon}
            onPress={onRightIconPress}
            color={colors.primary} 
          />
        )
      }
      theme={{
        colors: {
          primary: colors.primary, // Use primary color from theme
          placeholder: colors.primary, // Use primary color from theme
          text: textColor || colors.text, // Use text color from theme or textColor prop
        },
        fonts: {
          regular: { fontFamily: "Orbitron-ExtraBold" }
        }
      }}
    />
  );
});

export default InputField;