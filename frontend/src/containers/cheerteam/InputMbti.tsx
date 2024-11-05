import InputMbtiComponents from "../../components/cheerteam/InputMbti";

interface InputMbtiProps {
  onClick: () => void
}

const InputMbti = (props: InputMbtiProps) => {

  return (
    <>
      <InputMbtiComponents onOkClick={props.onClick} />
    </>
  );
}

export default InputMbti;