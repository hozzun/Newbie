import { useNavigate } from "react-router-dom";
import SectionBoxComponent from "../../components/common/SectionBox";
import { CircleButtonProps } from "../../components/common/CircleButton";

interface SectionBoxProps {
  label?: string;
  rightButton?: CircleButtonProps;
  onBackClick?: () => void;
}

const SectionBox = (props: SectionBoxProps) => {
  const nav = useNavigate();
  const goBack = () => nav(-1);

  return (
    <SectionBoxComponent label={props.label} onBackClick={goBack} rightButton={props.rightButton} />
  );
};

export default SectionBox;
