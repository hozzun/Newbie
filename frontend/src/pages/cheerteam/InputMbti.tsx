import InputMbtiContainers from "../../containers/cheerteam/InputMbti";
import Container from "../../components/common/Container";
import SectionBox from "../../components/common/SectionBox";

function InputMbti() {

  return (
    <>
      <SectionBox label="구단 추천" />
      <Container>
        <InputMbtiContainers />
      </Container>
    </>
  );
}

export default InputMbti;