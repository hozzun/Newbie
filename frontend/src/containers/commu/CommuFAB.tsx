import { CircleButtonItem } from "../../components/common/CircleButton";
import FAB from "../../components/common/FAB";
import { CIRCLE_BUTTON_VARIANTS } from "../../components/common/variants";
import Pencil from "../../assets/icons/pencil-solid.svg?react";
import { useNavigate } from "react-router-dom";

interface CommuFABProps {
  selectedTab: "free" | "trade";
}

const CommuFAB = ({ selectedTab }: CommuFABProps) => {
  const nav = useNavigate();

  const fabItem: CircleButtonItem = {
    img: Pencil,
  };

  const handleCreateBoard = () => {
    // 선택된 탭에 따라 이동할 경로 설정
    if (selectedTab === "free") {
      nav("/commuhome/freecreate");
    } else if (selectedTab === "trade") {
      nav("/commuhome/tradecreate");
    }
  };

  return (
    <FAB variant={CIRCLE_BUTTON_VARIANTS.whiteFAB} item={fabItem} onClick={handleCreateBoard} />
  );
};

export default CommuFAB;
