import RewindSolid from '../../assets/icons/rewind-solid.svg?react'
import Pause from '../../assets/icons/pause-solid.svg?react'

interface MusicControllProps {
  onClickLeft: () => void;
  onClickPause: () => void;
  onClickRight: () => void;
}

const MusicControll = (props: MusicControllProps) => {

  return (
      <div className='fixed bottom-10 flex flex-row justify-center items-center text-gray-400 ml-24'>
        <RewindSolid className='w-5 h-5 mx-10' onClick={props.onClickLeft} />
        <Pause className='w-5 h-5 mx-10' onClick={props.onClickPause} />
        <RewindSolid className='w-5 h-5 mx-10 rotate-180' onClick={props.onClickRight} />
      </div>
  )
}

export default MusicControll