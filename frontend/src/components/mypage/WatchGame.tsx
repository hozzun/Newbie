import { useNavigate } from "react-router-dom"
import Storage from "../../assets/icons/storage.svg?react"
import WatchCard from "./WatchCard"
import Plus from "../../assets/icons/plus.svg?react"
import Ticket from "../../assets/images/직관경기티켓.jpg"

const WatchGame = () => {
  // TODO: 나의 직관 경기 리스트 받아오기

  const nav = useNavigate()
  const goCamera = () => {
    nav('/camera')
  }

  const goGameResult = () => {
    console.log('경기 결과 상세 조회 페이지로 이동')
    nav('/mypage/watchgame')
  }

  return (
    <div className="my-7">
      <div className="flex flex-row">
        <Storage className="w-6 h-6 ml-5 text-gray-200" />
        <p className="font-kbogothicbold text-gray-600 ml-3">나의 직관 경기</p>
      </div>
      <div className="grid grid-cols-2 justify-center items-center gap-7 mr-10">
        {/* 직관 경기 수만큼 */}
        <WatchCard img={Ticket} onClick={goGameResult} />
        <div className="w-full h-44 rounded-2xl bg-gray-200 mt-7 flex justify-center items-center ml-5">
          <Plus className="w-6 h-6 text-gray-500 hover:cursor-pointer" onClick={goCamera} />
        </div>
      </div>
    </div>
  )
}

export default WatchGame
