import ClubSelectItem from "../common/ClubSelectItem";
import ClubLogos from "../../util/ClubLogos";
import MusicLyrics from "../../assets/icons/music-lyrics.svg?react";

interface CheerSongProps {
  club: "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
  title: string;
  singer?: string;
  showIcon: boolean
  onClick?: () => void;
}

const CheerSong = (props: CheerSongProps) => {

  return (
    <div
      className="flex flex-row justify-between font-kbogothicmedium mb-3"
    >
      <div className="flex flex-row">
        <ClubSelectItem
          logo={ClubLogos[props.club]}
          clubColor={props.club}
          width="w-16 h-16 mt-3"
          isSelected={false}
        />
        <div className="flex flex-col m-5">
          <p className="text-gray-600 mb-1">{props.title}</p>
          <p className="text-gray-200 text-xs">{props.singer}</p>
        </div>
      </div>
      {props.showIcon && (
        <MusicLyrics className="mt-5 w-6 h-6 mr-3" onClick={props.onClick} />
      )}
    </div>
  );
};

export default CheerSong;
