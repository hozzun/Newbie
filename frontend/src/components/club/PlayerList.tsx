import TextButton from "../common/TextButton";
import PlayerItem from "./PlayerItem";

const PlayerList = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">선수단</p>
        <TextButton onClick={() => console.log("선수단 페이지 이동")}>더보기</TextButton>
      </div>
      <div className="flex justify-between space-x-4 w-[98%] mt-3">
        <PlayerItem />
        <PlayerItem />
        <PlayerItem />
      </div>
    </div>
  );
};

export default PlayerList;
