import Container from "../common/Container";
import PlayerSectionBox from "./PlayerSectionBox";
import Karina from "../../assets/images/karina.jpg";
import PlayerProfile from "./PlayerProfile";

const Player = () => {
  return (
    <>
      <PlayerSectionBox label="투수" />
      <Container>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between items-center">
            <div className="aspect-[2/2.4] w-[45%]">
              <img src={Karina} alt="인물 사진" className="w-full h-full object-cover rounded-lg" />
            </div>
            <PlayerProfile />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Player;
