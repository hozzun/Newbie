import SectionBox from "../../components/common/SectionBox";
import Container from "../../components/common/Container";
import SignupContainer from "../../containers/auth/Signup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();

  const handleNav = () => {
    nav("/login", { replace: true });
    console.log("클릭");
  };

  return (
    <>
      <SectionBox label="가입하기" onClick={handleNav} />
      <Container>
        <SignupContainer />
      </Container>
    </>
  );
};

export default Signup;
