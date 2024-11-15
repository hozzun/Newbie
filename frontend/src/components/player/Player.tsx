import Container from "../common/Container";
import PlayerProfile from "./PlayerProfile";
import { PlayerRecordItemProps } from "./PlayerRecordItem";
import PlayerRecord from "./PlayerRecord";
import PlayerMusicController from "./PlayerMusicController";
import PlayerHighlight from "./PlayerHighlight";
import SectionBox from "../../containers/common/SectionBox";
import { CircleButtonProps } from "../common/CircleButton";
import { CIRCLE_BUTTON_VARIANTS } from "../common/variants";
import Heart from "../../assets/icons/heart-solid.svg?react";
import { PlayerInfo } from "../../containers/player/PlayerList";
import { HitterRecords, PitcherRecords, Video } from "../../containers/player/Player";

interface PlayerProps {
  playerInfo: PlayerInfo | null;
  clubId: string | null;
  playerRecord: PitcherRecords | HitterRecords | null;
  playerSeasonRecordItem: Array<PlayerRecordItemProps> | null;
  playerHighlights: Array<Video> | null;
}

const rightButtonProps: CircleButtonProps = {
  className: "w-9 h-9",
  variant: CIRCLE_BUTTON_VARIANTS.errorLine,
  item: { img: Heart },
};

const Player = (props: PlayerProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SectionBox rightButton={rightButtonProps} />
      <Container>
        {props.clubId && (
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="aspect-[2/2.4] w-[40%]">
                <img
                  src={props.playerInfo?.imageUrl}
                  alt={props.playerInfo ? props.playerInfo.name : "선수 사진"}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <PlayerProfile playerInfo={props.playerInfo} />
            </div>
            <PlayerRecord
              label={`${currentYear} 기록`}
              clubId={props.clubId}
              items={props.playerSeasonRecordItem}
              data={props.playerRecord}
            />
            <PlayerMusicController />
            <PlayerHighlight playerHighlights={props.playerHighlights} />
          </div>
        )}
      </Container>
    </>
  );
};

export default Player;
