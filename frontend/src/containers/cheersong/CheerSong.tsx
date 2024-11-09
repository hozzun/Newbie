import axios from "axios"
import { useState, useEffect } from "react"
import ClubChangeButton from "../../components/cheersong/ClubChangeButton"
import PageName from "../../components/common/PageName"
import CountSong from "../../components/cheersong/CountSong"
import CheerSongComponent from "../../components/cheersong/CheerSong"
import MusicController from "../../components/common/MusicController"
import { useNavigate } from "react-router-dom"

const CheerSong = () => {
  // TODO: 나의 팀 정보 받아오기, 음악 컨트롤러 설정
  const navigate = useNavigate()

  const [count, setCount] = useState<number>(0)
  const [cheerSongs, setCheerSongs] = useState<{ title: string; url: string }[]>([]);

  const goClubSelect = () => {
    navigate('/cheerteam')
  }

  const goLyris = () => {
    navigate('/cheersong/cheerlyris')
  }

  const getCheerSong =  async () => {

    const api_url = import.meta.env.VITE_CHEER_SONG
    const teamName = "KIA"

    try {
      const response = await axios.get(api_url, {
        params: { teamName: teamName },
      });
      console.log(response.data);
      setCheerSongs(response.data)
      setCount(response.data.length)
    } catch (error) {
      console.error("Error fetching cheer song:", error);
    }
  };

  useEffect(() => {
    getCheerSong()
  }, []);

  return (
    <>
      <PageName label="응원가" />
      <ClubChangeButton club="ssg" onClick={goClubSelect} />
      <CountSong count={count} />
      {cheerSongs.map((song, index) => (
        <CheerSongComponent
          key={index}
          club="kia" 
          title={song.title}
          onClick={goLyris} 
          showIcon={true}
        />
      ))}
      <MusicController />
    </>
  )
}

export default CheerSong