import { InputFieldProps } from "@/types/type";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";

const InputField = ({
  labelStyle,
  label,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={() => Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border-neutral-100 focus:border-primary-100 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default InputField;
