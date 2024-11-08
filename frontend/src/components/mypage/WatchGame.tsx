import Storage from "../../assets/icons/storage.svg?react"

const WatchGame = () => {

  // TODO: 나의 직관 경기 리스트 받아오기

  return (
    <div className="my-7">
      <div className="flex flex-row">
        <Storage className="w-6 h-6 ml-5 text-gray-200" />
        <p className="font-kbogothicbold text-gray-600 ml-3">나의 직관 경기</p>
      </div>
    </div>
  )
}

export default WatchGame