import CheerSong from "../../components/cheersong/CheerSong"
import CheerLyrisComponent from "../../components/cheersong/CheerLyris"
import MusicControll from "../../components/cheersong/MusicControll"

const CheerLyris = () => {

  // TODO: 버튼에 따른 navigate 설정, 노래 정보 받아오기, 노래 재생에 따라 컨트롤러 이동

  const onClickLeft = () => {
    console.log('왼쪽 버튼 클릭')
  }

  const onClickPause = () => {
    console.log('정지 버튼 클릭')
  }

  const onClickRight = () => {
    console.log('오른쪽 버튼 클릭')
  }


  return (
    <>
      <div className="m-5">
        <CheerSong club="ssg" title="랜더스여" showIcon={false} />
        <CheerLyrisComponent lyris="가사" />
        <div className="w-full bg-gray-200 rounded-full h-1 mt-10">
          <div className="bg-gray-400 h-1 rounded-full w-1/3"></div>
        </div>
        <div>
          <MusicControll onClickLeft={onClickLeft} onClickPause={onClickPause} onClickRight={onClickRight} />
        </div>
      </div>
    </>
  )
}

export default CheerLyris
