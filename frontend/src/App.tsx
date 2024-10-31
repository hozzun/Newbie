import ClubSelect from "./components/common/ClubSelect";
import ClubSelectItem from "./components/common/ClubSelectItem";
import ClubChangeButton from "./components/common/ClubChangeButton";
import ClubLogos from "./util/clubLogos";

function App() {
  return (
    <>
      <p className="text-green-900 font-kbogothicbold">Hello World</p>
      <div>
        <ClubSelect />
        <div className="flex">
          <ClubSelectItem
            logo={ClubLogos["ssg"]} // clubLogos 객체에서 로고 가져오기
            clubColor={"ssg"}
            width="w-40"
          />
          <ClubSelectItem
            logo={ClubLogos["doosan"]} // clubLogos 객체에서 로고 가져오기
            clubColor={"doosan"}
            width="w-40"
          />
        </div>
        <ClubChangeButton logo={ClubLogos["ssg"]} clubColor="ssg" club="SSG 랜더스" />
      </div>
    </>
  );
}

export default App;
