import RewindSolid from '../../assets/icons/rewind-solid.svg?react';
import Pause from '../../assets/icons/pause-solid.svg?react';
import Play from '../../assets/icons/play-solid.svg?react';

interface MusicControllProps {
  onClickLeft: () => void;
  onClickPause: () => void;
  onClickRight: () => void;
  onClickPlay: () => void;
  isPlaying: boolean;
}

const MusicControll = (props: MusicControllProps) => {
  return (
    <div className="flex flex-row mt-16 justify-center items-center text-gray-400">
      <RewindSolid className="w-5 h-5 mx-10" onClick={props.onClickLeft} />
      {props.isPlaying ? (
        <Pause className="w-5 h-5 mx-10" onClick={props.onClickPause} />
      ) : (
        <Play className="w-5 h-5 mx-10" onClick={props.onClickPlay} />
      )}
      <RewindSolid className="w-5 h-5 mx-10 rotate-180" onClick={props.onClickRight} />
    </div>
  );
};

export default MusicControll;
