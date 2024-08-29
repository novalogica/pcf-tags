import { IInputProps } from "@fluentui/react";
import { IToggleStyles } from "@fluentui/react/lib/Toggle";

export const toggleStyles: Partial<IToggleStyles> = {
  text: { minWidth: '100%' }
};

export const inputProps: IInputProps = {
  style: { margin: 0 },
  placeholder: "Type and press Enter to add a tag"
};