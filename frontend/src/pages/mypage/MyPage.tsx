import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container"
import MyPageContainer from "../../containers/mypage/MyPage"
import BottomNavigation from "../../components/common/BottomNavigation";

const MyPage = () => {
  const navigate = useNavigate();

  const handleBottomNavigationClick = (index: number) => {
    const routes = ["/clubhome", "/cheersong", "/", "/communication", "/mypage"];
    navigate(routes[index]);
  };

  return (
    <>
      <Container>
        <MyPageContainer />
      </Container>
      <BottomNavigation onButtonClick={handleBottomNavigationClick} />
    </>
  )
}

export default MyPage