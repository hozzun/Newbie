import { useState } from "react";
import { Video } from "../../containers/player/Player";
import PlayerHightlightItem from "./PlayerHightlightItem";

interface PlayerHighlightProps {
  playerHighlights: Array<Video> | null;
}

const PlayerHighlight = (props: PlayerHighlightProps) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    setPlayingIndex(index);
  };

  const handlePause = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full mb-3">
        <p className="text-2xl font-kbogothicbold text-gray-700">하이라이트</p>
      </div>
      {props.playerHighlights && props.playerHighlights.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 w-full">
          {props.playerHighlights.map((playerHighlight, index) => {
            const isPlaying = playingIndex === index;
            console.log(`${index}: ${isPlaying}`);

            return (
              <div key={index} className={`${isPlaying ? "col-span-2" : ""}`}>
                <PlayerHightlightItem
                  playerHighlight={playerHighlight}
                  isPlaying={isPlaying}
                  handlePlay={() => handlePlay(index)}
                  handlePause={() => handlePause(index)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-base font-kbogothicmedium text-gray-700">
          해당 선수에 대한 하이라이트 영상이 없습니다...
        </p>
      )}
    </div>
  );
};

export default PlayerHighlight;
