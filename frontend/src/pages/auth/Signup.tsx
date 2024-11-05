import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";
import SignupContainer from "../../containers/auth/Signup";

const Signup = () => {
  return (
    <>
      <SectionBox label="가입하기" />
      <Container>
        <SignupContainer />
      </Container>
    </>
  );
};

export default Signup;
