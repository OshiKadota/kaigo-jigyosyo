import Checkbox from "@/components/atoms/Checkbox";
import { ChangeEvent } from "react";
import { CheckboxItems } from "./CheckboxGroup.type";

type Props<T extends string = string, U extends string = string> = {
  checkboxItems: readonly CheckboxItems<T, U>[];
  checkedValues: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxGroup = <T extends string = string, U extends string = string>(
  props: Props
) => {
  return (
    <div className="flex flex-col">
      {props.checkboxItems.map((val, index) => {
        return (
          <Checkbox
            label={val.label}
            checked={props.checkedValues.includes(val.value)}
            value={val.value}
            onChange={props.onChange}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
