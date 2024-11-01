import ClubChangeButton from "./components/common/ClubChangeButton";
import ClubSelect from "./components/common/ClubSelect";
import ClubSelectItem from "./components/common/ClubSelectItem";
import MusicController from "./components/common/MusicController";
import ClubLogos from "./util/ClubLogos";

function App() {
  return (
    <>
      <p className="text-green-900 font-kbogothicbold">Hello World</p>
      <MusicController />
      <ClubSelect />
      <ClubChangeButton logo={ClubLogos["ssg"]} clubColor="ssg" club="ssg" />
      <ClubSelectItem
        logo={ClubLogos["ssg"]} // clubLogos 객체에서 로고 가져오기
        clubColor="ssg"
        width="w-24"
      />
    </>
  );
}

export default App;
