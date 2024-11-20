import IntroComponent from "../../components/intro/Intro";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const nav = useNavigate();

  const goNext = () => {
    localStorage.setItem("hasSeenIntro", "true");
    nav("/login", { replace: true });
  };

  return <IntroComponent goNext={goNext} />;
};

export default Intro;
