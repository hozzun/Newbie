import { useNavigate } from 'react-router-dom';
import InputMbti from "../../containers/clubrecommend/InputMbti";



function InputMbtiPage() {

  const navigate = useNavigate();

  const goToNextPage = () => {
    // navigate('');
  };

  return (
    <>
      <InputMbti onOkClick={goToNextPage} />
    </>
  );
}

export default InputMbtiPage;