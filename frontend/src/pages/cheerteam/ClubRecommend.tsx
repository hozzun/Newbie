import { useNavigate } from "react-router-dom";
import ClubRecommendContainer from "../../containers/cheerteam/ClubRecommend";
import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";

const ClubRecommend = () => {

  const nav = useNavigate()

  const handleNav = () => {
    nav(-1)
  }

  return (
    <>
      <SectionBox label="구단 추천" onClick={handleNav} />
      <Container>
        <ClubRecommendContainer />
      </Container>
    </>
  );
};

export default ClubRecommend;
