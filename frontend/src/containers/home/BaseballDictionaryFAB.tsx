import { CircleButtonItem } from "../../components/common/CircleButton";
import FAB from "../../components/common/FAB";
import { CIRCLE_BUTTON_VARIANTS } from "../../components/common/variants";
import Book from "../../assets/icons/book.svg?react";
import { useNavigate } from "react-router-dom";

const BaseballDictionaryFAB = () => {
  const nav = useNavigate();

  const fabItem: CircleButtonItem = {
    img: Book,
  };

  const goBaseballDistionary = () => {
    nav("/baseballdict");
  };

  return (
    <FAB variant={CIRCLE_BUTTON_VARIANTS.whiteFAB} item={fabItem} onClick={goBaseballDistionary} />
  );
};

export default BaseballDictionaryFAB;
