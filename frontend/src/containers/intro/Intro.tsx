import IntroComponent from "../../components/intro/Intro";

const Intro = () => {
  const goNext = () => {
    // TODO: MOVE - 시작 페이지
    console.log("시작 페이지 이동");
  };

  return <IntroComponent goNext={goNext} />;
};

export default Intro;
