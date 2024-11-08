import ClubRecommendContainer from "../../containers/cheerteam/ClubRecommend";
import Container from "../../components/common/Container";
import SectionBox from "../../containers/common/SectionBox";

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
