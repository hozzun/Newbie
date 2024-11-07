import Container from "../../components/common/Container"
import SectionBox from "../../components/common/SectionBox"
import CheerLyrisContainer from "../../containers/cheersong/CheerLyris"

const CheerLyris = () => {

  return (
    <>
      <SectionBox label="응원가" />
      <Container>
        <CheerLyrisContainer />
      </Container>
    </>
  )
}

export default CheerLyris
