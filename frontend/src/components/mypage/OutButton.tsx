import Button from "../common/Button"
import { BUTTON_VARIANTS } from "../common/variants"

interface OutButtonProps {
  logoutClick: () => void;
  deleteClick: () => void;
}

const OutButton = (props: OutButtonProps) => {

  return (
    <div className="flex justify-center items-center flex-row">
      <Button 
      className="flex justify-center items-center w-1/2 h-10 m-2 hover:cursor-pointer"
      variant={BUTTON_VARIANTS.primary} children="로그아웃" onClick={props.logoutClick} />
      <Button 
      className="flex justify-center items-center w-1/2 h-10 m-2 bg-green-50 hover:cursor-pointer"
      variant={BUTTON_VARIANTS.primaryText} children="회원탈퇴" onClick={props.deleteClick} />
    </div>
  )
}

export default OutButton