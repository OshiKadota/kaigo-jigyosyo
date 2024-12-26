import { ChangeEvent } from "react";

export type CheckboxProps = {
  label: string;
  checked: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
