import { CircleButtonItem } from "../../components/common/CircleButton";
import FAB from "../../components/common/FAB";
import { CIRCLE_BUTTON_VARIANTS } from "../../components/common/variants";
import Book from "../../assets/icons/book.svg?react";

const BaseballDictionaryFAB = () => {
  const fabItem: CircleButtonItem = {
    img: Book,
  };

  const goBaseballDistionary = () => {
    // TODO: MOVE - 야구 사전
    console.log("야구 사전 페이지로 이동");
  };

  return (
    <FAB variant={CIRCLE_BUTTON_VARIANTS.whiteFAB} item={fabItem} onClick={goBaseballDistionary} />
  );
};

export default BaseballDictionaryFAB;
