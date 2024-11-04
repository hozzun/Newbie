import InputMbti from "../../containers/clubrecommend/InputMbti";


function InputMbtiPage() {

  const goToNextPage = () => {
    console.log('다음')
    // navigate('');
  };

  return (
    <>
      <InputMbti onOkClick={goToNextPage} />
    </>
  );
}

export default InputMbtiPage;