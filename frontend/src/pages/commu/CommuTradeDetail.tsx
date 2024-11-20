import Container from "../../components/common/Container";
import SectionBox from "../../components/common/SectionBox";
import CommuTradeDetailContainer from "../../containers/commu/CommuTradeDetail";
import { useNavigate } from "react-router-dom";

const CommuFreeDetail = () => {

  const nav = useNavigate()
  
  return (
    <>
      <SectionBox onBackClick={() => nav('/commuhome')}/>
      <Container>
        <CommuTradeDetailContainer />
      </Container>
    </>
  );
};

export default CommuFreeDetail;
