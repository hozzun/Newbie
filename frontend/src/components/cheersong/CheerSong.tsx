import { useState } from "react";
import ClubSelectItem from "../common/ClubSelectItem";
import ClubLogos from "../../util/ClubLogos";
import MusicLyrics from "../../assets/icons/music-lyrics.svg?react";

interface CheerSongProps {
  club: "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
  title: string;
  singer: string;
  onClick: () => void;
}

const CheerSong = (props: CheerSongProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={`flex flex-row justify-between font-kbogothicmedium border ${isFocused ? "boder-green-100" : ""}`}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="flex flex-row">
        <ClubSelectItem
          logo={ClubLogos[props.club]}
          clubColor={props.club}
          width="w-16"
          isSelected={false}
        />
        <div className="flex flex-col m-5">
          <p className="text-gray-600 mb-1">{props.title}</p>
          <p className="text-gray-200 text-xs">{props.singer}</p>
        </div>
      </div>
      <MusicLyrics className="mt-5 w-6 h-6 mr-3" onClick={props.onClick} />
    </div>
  );
};

export default CheerSong;
