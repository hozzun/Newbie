import TextField from "../common/TextField";
import SelectBox from "../common/SelectBox";
import Button from "../common/Button";
import { BUTTON_VARIANTS } from "../common/variants";

interface SignupProps {
  buttonVariant: BUTTON_VARIANTS;
  onNameChange: (name: string) => void;
  onSelectionChange: (si: string, gun: string) => void;
  onButtonClick: () => void;
}

const Signup = ({ buttonVariant, onNameChange, onSelectionChange, onButtonClick }: SignupProps) => {
  return (
    <div>
      <div>
        <TextField label="닉네임" onNameChange={onNameChange} placeholder="이름을 입력해주세요" />
      </div>

      <div>
        <SelectBox
          label="주소"
          onSelectionChange={onSelectionChange}
          placeholder1="시"
          placeholder2="구"
        />
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
      </div>
    </div>
  );
};

export default Signup;
