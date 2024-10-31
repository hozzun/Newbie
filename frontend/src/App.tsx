import ClubSelect from "./components/common/ClubSelect";
import ClubSelectItem from "./components/common/ClubSelectItem";

import clubLogos from "../src/util/clubLogos";

function App() {
  return (
    <>
      <p className="text-green-900 font-kbogothicbold">Hello World</p>
      <div>
        <ClubSelect />
        <ClubSelectItem
          logo={clubLogos["ssg"]} // clubLogos 객체에서 로고 가져오기
          clubColor={"ssg"}
          width="w-64"
        />
      </div>
    </>
  );
}

export default App;
