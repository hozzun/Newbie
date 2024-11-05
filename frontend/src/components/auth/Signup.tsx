import TextField from "../common/TextField";
import SelectBox from "../common/SelectBox";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

interface SignupProps {
  buttonVariant: BUTTON_VARIANTS;
  onNameChange: (name: string) => void;
  onSelectionChange: (si: string, gun: string) => void;
  onButtonClick: () => void;
  signUpPath: string;
}

const Signup = ({
  buttonVariant,
  onNameChange,
  onSelectionChange,
  onButtonClick,
  signUpPath,
}: SignupProps) => {
  return (
    <div>
      <div>
        <TextField label="닉네임" onNameChange={onNameChange} />
      </div>

      <div>
        <SelectBox label="주소" onSelectionChange={onSelectionChange} />
      </div>

      <div className="mx-auto mt-8 w-full px-3">
        <Button
          variant={buttonVariant}
          className="w-full mb-8"
          onClick={buttonVariant === BUTTON_VARIANTS.primary ? onButtonClick : undefined}
          disabled={buttonVariant !== BUTTON_VARIANTS.primary}
        >
          회원가입
        </Button>
        <div className="text-center mt-auto mb-4">
          <p className="font-kbogothiclight mb-4">
            이미 계정이 있으신가요?{" "}
            <a href={signUpPath} className="text-green-900">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
