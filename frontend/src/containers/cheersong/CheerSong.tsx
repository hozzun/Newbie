import axios from "axios"
import { useState, useEffect, useRef } from "react"
import ClubChangeButton from "../../components/cheersong/ClubChangeButton"
import PageName from "../../components/common/PageName"
import CountSong from "../../components/cheersong/CountSong"
import CheerSongComponent from "../../components/cheersong/CheerSong"
import MusicController from "../../components/common/MusicController"
import { useNavigate } from "react-router-dom"

const CheerSong = () => {

  const navigate = useNavigate()

  const club = "ssg"   // TODO: 나의 팀 정보 받아오기
  const [count, setCount] = useState<number>(0)
  const [cheerSongs, setCheerSongs] = useState<{ title: string; url: string }[]>([]);
  const [currentSong, setCurrentSong] = useState<{ title: string; url: string } | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const goClubSelect = () => {
    navigate('/cheerteam')
  }

  const goLyris = () => {
    navigate('/cheersong/cheerlyris')
  }

  const getCheerSong =  async () => {

    const api_url = import.meta.env.VITE_CHEER_SONG
    const teamName = club

    try {
      const response = await axios.get(api_url, {
        params: { teamName: teamName },
      });
      setCheerSongs(response.data)
      setCount(response.data.length)
    } catch (error) {
      console.error("Error fetching cheer song:", error);
    }
  };

  useEffect(() => {
    getCheerSong()
  }, []);

  const handleSongClick = (song: { title: string; url: string }) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(song.url);
    audioRef.current = audio;
    setCurrentSong(song);
    setProgress(0);

    audio.play();
    audio.addEventListener("ended", () => setCurrentSong(null));
    audio.addEventListener("timeupdate", () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    });
  };

  return (
    <>
      <PageName label="응원가" />
      <ClubChangeButton club={club} onClick={goClubSelect} />
      <CountSong count={count} />
      {cheerSongs.map((song, index) => (
        <CheerSongComponent
          key={index}
          club={club}
          title={song.title}
          url={song.url}
          onSingClick={() => handleSongClick(song)}
          onIconClick={goLyris} 
          showIcon={true}
        />
      ))}

      {currentSong && <MusicController title={currentSong.title} club={club} audioRef={audioRef} progress={progress} />} 
    </>
  )
}

export default CheerSong