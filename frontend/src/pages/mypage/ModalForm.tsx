import Container from "../../components/common/Container"
import ModalFormContainer from "../../containers/mypage/ModalForm"

const ModalForm = () => {

  return (
    <>
      <Container>
        <ModalFormContainer date="2024.08.03" team1="키움 히어로즈" team2="두산 베어스" isOpen={true} />
      </Container>
    </>
  )
}

export default ModalForm