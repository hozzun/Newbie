import { useState } from "react";
import CaretDownSolid from "../../assets/icons/caret-down-solid.svg?react";
import CaretUpSolid from "../../assets/icons/caret-up-solid.svg?react";
import CircleButton from "./CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "./variants";

interface DropdownProps {
  minWidth: number;
  options: Array<string>;
  selected: string;
  onSelect: (value: string) => void;
}

export interface SortSelectBoxProps {
  options: Array<string>;
  minWidth: number;
  selectedSortOption: string;
  handleSelectSortOption: (value: string) => void;
}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (value: string) => {
    props.onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div className="flex flex-row items-center">
        <p className="pr-1 py-2 text-sm font-kbogothiclight text-gray-700">
          {props.selected || props.options[0]}
        </p>
        {isOpen ? (
          <CircleButton
            className="w-10 h-10"
            variant={CIRCLE_BUTTON_VARIANTS.grayLine}
            item={{ img: CaretUpSolid }}
            onClick={handleToggle}
          />
        ) : (
          <CircleButton
            className="w-10 h-10"
            variant={CIRCLE_BUTTON_VARIANTS.grayLine}
            item={{ img: CaretDownSolid }}
            onClick={handleToggle}
          />
        )}
      </div>
      {isOpen && (
        <div
          className={`absolute right-2 z-10 min-w-[${props.minWidth}px] mt-0.5 bg-white border border-gray-200 rounded-lg shadow-xl`}
        >
          {props.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer text-sm font-kbogothiclight text-gray-700"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SortSelectBox = (props: SortSelectBoxProps) => {
  return (
    <Dropdown
      minWidth={props.minWidth}
      options={props.options}
      selected={props.selectedSortOption}
      onSelect={props.handleSelectSortOption}
    />
  );
};

export default SortSelectBox;
