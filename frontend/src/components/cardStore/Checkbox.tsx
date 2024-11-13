interface CheckboxProps {
  className?: string;
  label: string;
  checked: boolean;
  handleChecked: () => void;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <label className={`${props.className} flex items-center space-x-2 cursor-pointer`}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.handleChecked}
        className="w-4 h-4 text-success-400 bg-gray-100 border-gray-300 rounded focus:ring-success-500"
      />
      <span className="text-sm font-kbogothiclight text-gray-700">{props.label}</span>
    </label>
  );
};

export default Checkbox;
