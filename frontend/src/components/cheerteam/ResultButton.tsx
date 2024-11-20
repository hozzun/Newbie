import Button from "../common/Button"
import { BUTTON_VARIANTS } from "../common/variants"

interface ResultButtonProps {
  onCheerClick: () => void;
  onReClick: () => void;
}

const ResultButton = (props: ResultButtonProps) => {

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <Button className="w-4/5" variant={BUTTON_VARIANTS.primary} children="응원하러 가기" onClick={props.onCheerClick}/>
      <Button className="mt-5 w-4/5" variant={BUTTON_VARIANTS.second} children="다시 추천 받기" onClick={props.onReClick} />
    </div>
  )
}

export default ResultButton