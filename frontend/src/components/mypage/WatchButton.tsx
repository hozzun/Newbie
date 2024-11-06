import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

interface WatchButtonProps {
  onClick: () => void
}

const WatchButton = (props: WatchButtonProps) => {

  const goGamePage = () => {
    console.log('경기 정보 페이지로 이동')
    // TODO: navigate 연결
  }

  return (
    <div className="flex justify-center items-center flex-row">
      <Button 
      className="flex justify-center items-center w-36 h-10 m-2"
      variant={BUTTON_VARIANTS.primary} children="경기 정보" onClick={goGamePage} />
      <Button 
      className="flex justify-center items-center w-36 h-10 m-2 bg-green-50"
      variant={BUTTON_VARIANTS.primaryText} children="삭제하기" onClick={props.onClick} />
    </div>
  )
}

export default WatchButton