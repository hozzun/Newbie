import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

interface TabBarProps {
  className?: string;
  options: Array<string>;
  selectedOption: string;
  handleSelectOption: (value: string) => void;
}

const TabBar = (props: TabBarProps) => {
  return (
    <div className={`${props.className} flex flex-row justify-start w-full space-x-3`}>
      {props.options.map((option, index) => (
        <Button
          key={index}
          variant={
            props.selectedOption === option
              ? BUTTON_VARIANTS.clickedTabBar
              : BUTTON_VARIANTS.nonClickedTabBar
          }
          onClick={() => props.handleSelectOption(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default TabBar;
