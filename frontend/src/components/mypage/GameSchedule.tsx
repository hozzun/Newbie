import Calaender from "../../assets/icons/calaender.svg?react"

const GameSchedule = () => {

  return (
    <div className="flex flex-row">
      <Calaender className="w-6 h-6 ml-5 text-gray-200" />
      <p className="font-kbogothicbold text-gray-600 ml-3">경기 일정</p>
    </div>
  )
}

export default GameSchedule