import Container from "../../components/common/Container";
import SectionBox from "../../components/common/SectionBox";
import CommuFreeDetailContainer from "../../containers/commu/CommuFreeDetail";
import { useNavigate } from "react-router-dom";

const CommuFreeDetail = () => {

  const nav = useNavigate()
  return (
    <>
      <SectionBox onBackClick={() => nav('/commuhome')}/>
      <Container>
        <CommuFreeDetailContainer />
      </Container>
    </>
  );
};

export default CommuFreeDetail;
