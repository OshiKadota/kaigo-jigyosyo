import { CheckboxProps } from "./Checkbox.type";

type Props = CheckboxProps;

const Checkbox = (props: Props) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        className="form-checkbox text-blue-600"
      />
      <span className="ml-2">{props.label}</span>
    </label>
  );
};

export default Checkbox;
