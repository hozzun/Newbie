import Container from "../../components/common/Container";
import BottomNavigation from "../../containers/common/BottomNavigation";
import MyPageContainer from "../../containers/mypage/MyPage";

const MyPage = () => {
  return (
    <>
      <Container>
        <MyPageContainer />
      </Container>
      <BottomNavigation />
    </>
  );
};

export default MyPage;
