import Container from "../../components/common/Container";
import BottomNavigation from "../../containers/common/BottomNavigation";
import CommuHomeContainer from "../../containers/commu/CommuHome";

const CommuHome = () => {
  return (
    <>
      <Container>
        <CommuHomeContainer />
      </Container>
      <BottomNavigation />
    </>
  );
};

export default CommuHome;
