import { useNavigate } from "react-router-dom";
import SectionBoxComponent from "../../components/common/SectionBox";

interface SectionBoxProps {
  label?: string;
}

const SectionBox = (props: SectionBoxProps) => {
  const nav = useNavigate();

  const goBack = () => nav(-1);

  return <SectionBoxComponent label={props.label} onClick={goBack} />;
};

export default SectionBox;
