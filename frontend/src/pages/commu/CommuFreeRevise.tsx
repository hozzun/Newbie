import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";
import CommuFreeReviseContainer from "../../containers/commu/CommuFreeRevise";
import { CircleButtonProps } from "../../components/common/CircleButton"
import { CIRCLE_BUTTON_VARIANTS } from "../../components/common/variants";
import Trash from "../../assets/icons/trash.svg?react"

const CommuFreeRevise = () => {

  const rightButtonProps: CircleButtonProps = {
    className: "w-6 h-6",
    variant: CIRCLE_BUTTON_VARIANTS.errorLine,
    item: { img: Trash },
    onClick: () => console.log('자유 게시글 삭제'),
  };

  return (
    <>
      <SectionBox label="수정하기" rightButton={rightButtonProps}/>
      <Container>
        <CommuFreeReviseContainer />
      </Container>
    </>
  );
};

export default CommuFreeRevise;
