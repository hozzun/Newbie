import CheerSong from "../../components/cheersong/CheerSong"
import CheerLyrisComponent from "../../components/cheersong/CheerLyris"

const CheerLyris = () => {

  return (
    <>
      <div className="m-5">
        <CheerSong club="ssg" title="랜더스여" singer="We are 랜더스 파이팅" showIcon={false} />
        <CheerLyrisComponent lyris="가사" />
      </div>
    </>
  )
}

export default CheerLyris
