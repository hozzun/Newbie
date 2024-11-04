import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

const WatchButton = () => {

  const goGamePage = () => {
    console.log('경기 정보 페이지로 이동')
    // TODO: navigate 연결
  }

  const deleteGame = () => {
    console.log('나의 직관 경기 삭제')
    // TODO: API 연결
  }

  return (
    <div className="flex justify-center items-center flex-row">
      <Button 
      className="flex justify-center items-center w-36 h-10 m-2"
      variant={BUTTON_VARIANTS.primary} children="경기 정보" onClick={goGamePage} />
      <Button 
      className="flex justify-center items-center w-36 h-10 m-2 bg-green-50"
      variant={BUTTON_VARIANTS.primaryText} children="삭제하기" onClick={deleteGame} />
    </div>
  )
}

export default WatchButton