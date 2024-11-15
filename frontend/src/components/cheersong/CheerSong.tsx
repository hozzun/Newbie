import { useNavigate } from "react-router-dom";
import ClubSelectItem from "../common/ClubSelectItem";
import ClubLogos from "../../util/ClubLogos";
import MusicLyrics from "../../assets/icons/music-lyrics.svg?react";
import ClubFullName from "../../util/ClubFullName";

interface CheerSongProps {
  club: "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
  title: string;
  url?: string;
  lyrics?: string;
  showIcon: boolean
  onSingClick?: () => void;
  all?: { title: string; url: string; }[];
}

const CheerSong = (props: CheerSongProps) => {

  const nav = useNavigate()
  const goLyris = () => {
    nav('/cheersong/lyris', { state: { club: props.club, title: props.title, lyrics: props.lyrics, all: props.all } })
  }

  return (
    <div
      className="flex flex-row justify-between font-kbogothicmedium mb-3"
    >
      <div className="flex flex-row" onClick={props.onSingClick}>
        <ClubSelectItem
          logo={ClubLogos[props.club]}
          clubColor={props.club}
          width="w-16 h-16 mt-3"
          isSelected={false}
        />
        <div className="flex flex-col m-5">
          <p className="text-gray-600 mb-1">{props.title}</p>
          <p className="text-gray-200 text-xs">{ClubFullName[props.club]}</p>
        </div>
      </div>
      {props.showIcon && (
        <MusicLyrics className="mt-5 w-6 h-6 mr-3" onClick={goLyris} />
      )}
    </div>
  );
};

export default CheerSong;
