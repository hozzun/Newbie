import InputMbtiComponents from "../../components/cheerteam/InputMbti";

const InputMbti = () => {

  const goToNextPage = () => {
    console.log('다음')
    // TODO: ClubRecommend.tsx 페이지로 이동
  };

  return (
    <>
      <InputMbtiComponents onOkClick={goToNextPage} />
    </>
  );
}

export default InputMbti;