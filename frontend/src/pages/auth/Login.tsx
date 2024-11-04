import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";
import LoginContainer from "../../containers/auth/Login";

const Login = () => {
  return (
    <>
      <SectionBox />
      <Container>
        <LoginContainer />
      </Container>
    </>
  );
};

export default Login;
