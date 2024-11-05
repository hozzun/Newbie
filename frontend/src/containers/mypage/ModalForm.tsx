import ModalFormComponent from "../../components/mypage/ModalForm"
import ModalImage from "../../components/mypage/ModalImage";
import ModalInput from "../../components/mypage/ModalInput";
import Button from "../../components/common/Button";
import ticket from "../../assets/images/직관경기티켓.jpg"
import { BUTTON_VARIANTS } from "../../components/common/variants";


const ModalForm = () => {

  return (
    <div className="flex flex-col rounded-t-2xl justify-center items-center w-full h-3/4 bg-gray-100">
      <ModalFormComponent date="2024.08.03" team1="키움 히어로즈" team2="두산 베어스" isOpen={true} />
      <ModalImage imageUrl={ticket} />
      <ModalInput />
      <Button className="w-4/5 mb-4" variant={BUTTON_VARIANTS.primary} children="저장하기" />
      <Button className="w-4/5 mb-10" variant={BUTTON_VARIANTS.second} children="다시찍기" />
    </div>
  )
}

export default ModalForm