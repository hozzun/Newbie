import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { getCheeringClub } from "./api/userApi";
import { useDispatch } from "react-redux";
import { setCheeringClub } from "./redux/teamSlice";

function App() {
  const dispatch = useDispatch();

  const fetchCheeringClub = async () => {
    const response = await getCheeringClub();
    const cheeringClubData: number = response.data;
    dispatch(setCheeringClub(cheeringClubData));
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      fetchCheeringClub();
    }
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
