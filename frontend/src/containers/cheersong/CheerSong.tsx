import axios from "axios"
import { useState, useEffect, useRef, useCallback } from "react"
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  const playSong = useCallback((index: number) => {
    const song = cheerSongs[index];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(song.url);
    audioRef.current = audio;
    setProgress(0); // 새로운 노래를 선택할 때 progress도 초기화

    audio.play();
    audio.addEventListener("ended", () => setCurrentIndex((index + 1) % cheerSongs.length));
    audio.addEventListener("timeupdate", () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    });
  }, [cheerSongs]);

  // 이전 노래 재생 함수
  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + cheerSongs.length) % cheerSongs.length;
    setCurrentIndex(prevIndex);
    playSong(prevIndex);
  };

  // 다음 노래 재생 함수
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % cheerSongs.length;
    setCurrentIndex(nextIndex);
    playSong(nextIndex);
  };

  // 인덱스가 변경될 때마다 노래 재생
  useEffect(() => {
    if (cheerSongs.length > 0) {
      playSong(currentIndex);
    }
  }, [currentIndex, cheerSongs, playSong]);

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
          onSingClick={() => setCurrentIndex(index)}
          onIconClick={goLyris} 
          showIcon={true}
        />
      ))}

      {cheerSongs[currentIndex] && <MusicController title={cheerSongs[currentIndex].title} club={club} audioRef={audioRef} progress={progress} onPrevious={handlePrevious} onNext={handleNext}/>} 
    </>
  )
}

export default CheerSong