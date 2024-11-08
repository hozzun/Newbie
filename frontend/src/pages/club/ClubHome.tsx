import { useNavigate } from "react-router-dom";

import ClubHomeComponent from "../../components/club/ClubHome";
import BottomNavigation from "../../components/common/BottomNavigation";

const ClubHome = () => {
  const navigate = useNavigate();

  const handleBottomNavigationClick = (index: number) => {
    const routes = ["/clubhome", "/cheersong", "/home", "/communication", "/mypage"];
    navigate(routes[index]);
  };
  return (
    <>
      <ClubHomeComponent />
      <BottomNavigation onButtonClick={handleBottomNavigationClick} />
    </>
  );
};

export default ClubHome;
