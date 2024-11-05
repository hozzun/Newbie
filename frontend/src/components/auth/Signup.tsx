import TextField from "../common/TextField";
import SelectBox from "../common/SelectBox";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

interface SignupProps {
  buttonVariant: BUTTON_VARIANTS;
}

const Signup = ({ buttonVariant }: SignupProps) => {
  return (
    <div>
      <div>
        <p className="font-kbogothicmedium m-3">닉네임</p>
        <TextField />
      </div>

      <div>
        <p className="font-kbogothicmedium m-3">주소</p>
        <SelectBox />
      </div>

      <div className="mx-auto mt-8 w-full px-3">
        <Button variant={buttonVariant} className="w-full">
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default Signup;
