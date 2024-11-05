import ClubRecommendContainer from "../../containers/cheerteam/ClubRecommend";
import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";

const ClubRecommend = () => {
  return (
    <>
      <SectionBox label="구단 추천" />
      <Container>
        <ClubRecommendContainer />
      </Container>
    </>
  );
};

export default ClubRecommend;
