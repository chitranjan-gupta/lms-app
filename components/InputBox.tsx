import { Text, View, BottomSheetTextInput } from "@/ui";

import type { InputFieldProps } from "@/types";

interface InputBoxProps extends InputFieldProps {}

export const InputBox = ({
  label,
  IconLeft,
  IconRight,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputBoxProps) => {
  return (
    <View className="my-2 w-full">
      <Text className={`text-lg font-bold mb-3 ${labelStyle}`}>{label}</Text>
      <View
        className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
      >
        {IconLeft}
        <BottomSheetTextInput
          className={`rounded-full p-4 font-bold text-[15px] flex-1 ${inputStyle} text-left`}
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {IconRight}
      </View>
    </View>
  );
};
