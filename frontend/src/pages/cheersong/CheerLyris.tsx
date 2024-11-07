import { useNavigate } from "react-router-dom"
import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import CheerLyrisContainer from "../../containers/cheersong/CheerLyris"

const CheerLyris = () => {

  const navigate = useNavigate()

  const handleNav = () => {
    navigate('/cheersong')
  }

  return (
    <>
      <SectionBox label="응원가" onClick={handleNav} />
      <Container>
        <CheerLyrisContainer />
      </Container>
    </>
  )
}

export default CheerLyris
