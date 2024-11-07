import RewindSolid from '../../assets/icons/rewind-solid.svg?react'
import Pause from '../../assets/icons/pause-solid.svg?react'

const MusicControll = () => {

  return (
    <div className='fixed bottom-10 flex flex-row justify-center items-center text-gray-400'>
      <RewindSolid className='w-5 h-5 mx-10'/>
      <Pause className='w-5 h-5 mx-10' />
      <RewindSolid className='w-5 h-5 mx-10 rotate-180' />
    </div>
  )
}

export default MusicControll