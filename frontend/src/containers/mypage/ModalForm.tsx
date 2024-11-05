import ModalFormComponent from "../../components/mypage/ModalForm"
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";

interface ModalFormProps {
  date: string;
  team1: string;
  team2: string;
  isOpen: boolean; // 모달 열림 상태
}

const ModalForm = (props: ModalFormProps) => {

  return (
    <div className="flex flex-col justify-center items-center w-full h-3/4 bg-gray-100">
      <ModalFormComponent date={props.date} team1={props.team1} team2={props.team2} isOpen={true} />
      <Button className="w-4/5" variant={BUTTON_VARIANTS.primary} children="저장하기" />
    </div>
  )
}

export default ModalForm