import TextField from "../common/TextField";
import SelectBox from "../common/SelectBox";

interface ReviseBoxProps {
  onNameChange: (name: string) => void;
  onSelectionChange: (si: string, gun: string) => void;
  name: string;
  placeholder1: string;
  placeholder2: string;
}

const ReviseBox = ({
  onNameChange,
  onSelectionChange,
  name,
  placeholder1,
  placeholder2
}: ReviseBoxProps) => {
  return (
    <div>
        <TextField label="닉네임" onNameChange={onNameChange} placeholder={name} />
        <SelectBox label="주소" onSelectionChange={onSelectionChange} placeholder1={placeholder1} placeholder2={placeholder2} />
    </div>
  );
};

export default ReviseBox;
