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
import Karina from "../../assets/images/karina.jpg";

const playerRecordItems: Array<PlayerRecordItemProps> = [
  {
    label: "타율1",
    value: "0.322",
  },
  {
    label: "타율2",
    value: "0.322",
  },
  {
    label: "타율3",
    value: "0.322",
  },
  {
    label: "타율4",
    value: "0.322",
  },
  {
    label: "타율5",
    value: "0.322",
  },
  {
    label: "타율6",
    value: "0.322",
  },
  {
    label: "타율7",
    value: "0.322",
  },
  {
    label: "타율8",
    value: "0.322",
  },
  {
    label: "타율9",
    value: "0.322",
  },
  {
    label: "타율10",
    value: "0.322",
  },
  {
    label: "타율11",
    value: "0.322",
  },
  {
    label: "타율12",
    value: "0.322",
  },
];

const rightButtonProps: CircleButtonProps = {
  className: "w-9 h-9",
  variant: CIRCLE_BUTTON_VARIANTS.errorLine,
  item: { img: Heart },
};

const Player = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SectionBox label="스토어" rightButton={rightButtonProps} />
      <Container>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between items-center">
            <div className="aspect-[2/2.4] w-[45%]">
              <img src={Karina} alt="인물 사진" className="w-full h-full object-cover rounded-lg" />
            </div>
            <PlayerProfile />
          </div>
          <PlayerRecord label={`${currentYear} 기록`} items={playerRecordItems} />
          <PlayerRecord label="통산 기록" items={playerRecordItems} />
          <PlayerMusicController />
          <PlayerHighlight />
        </div>
      </Container>
    </>
  );
};

export default Player;
