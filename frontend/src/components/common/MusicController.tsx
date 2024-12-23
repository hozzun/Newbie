import REWIND from "../../assets/icons/rewind-solid.svg?react";
import PAUSE from "../../assets/icons/pause-solid.svg?react";
import PLAY from "../../assets/icons/play-solid.svg?react";
import FORWARD from "../../assets/icons/forward-solid.svg?react";
import ClubFullName from "../../util/ClubFullName";

interface MusicControllerProps {
  title?: string;
  club: string;
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  progress?: number;
  isPlaying?: boolean;
  handlePlayPause?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const MusicController = (props: MusicControllerProps) => {
  return (
    <div className="flex flex-col p-4 bg-gray-400 text-white rounded-2xl shadow-md w-[100%]">
      <div className="flex w-full">
        <div className="flex flex-col text-left px-2">
          <h2 className="font-kbogothicmedium text-lg">{props.title}</h2>
          <p className="font-kbogothiclight text-sm">{ClubFullName[props.club]}</p>
        </div>
        <div className="flex justify-end items-center ml-auto space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-400 focus:outline-none w-8 h-8" onClick={props.onPrevious}>
            <REWIND className="fill-current text-white w-full h-full" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-400 focus:outline-none w-8 h-8" 
            onClick={props.handlePlayPause}>
            {props.isPlaying ? (
              <PAUSE className="fill-current text-white w-full h-full" />
            ) : (
              <PLAY className="fill-current text-white w-full h-full" />
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-400 focus:outline-none w-8 h-8" onClick={props.onNext}>
            <FORWARD className="fill-current text-white w-full h-full" />
          </button>
        </div>
      </div>
      <div className="w-full bg-white rounded-full h-1 mt-2">
        <div className="bg-black h-1 rounded-full" style={{ width: `${props.progress}%` }}></div>
      </div>
    </div>
  );
};

export default MusicController;
