import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import ClubChangeButton from "../../components/cheersong/ClubChangeButton";
import PageName from "../../components/common/PageName";
import CountSong from "../../components/cheersong/CountSong";
import CheerSongComponent from "../../components/cheersong/CheerSong";
import MusicController from "../../components/common/MusicController";
import { useNavigate } from "react-router-dom";

const CheerSong = () => {
  const navigate = useNavigate();
  const club = "ssg"; // TODO: 나의 팀 정보 받아오기
  const [count, setCount] = useState<number>(0);
  const [cheerSongs, setCheerSongs] = useState<{ title: string; url: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // currentIndex를 null로 초기화
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 상태 관리
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const goClubSelect = () => {
    navigate("/cheerteam");
  };

  const getCheerSong = async () => {
    const api_url = import.meta.env.VITE_CHEER_SONG;
    const teamName = club;

    try {
      const response = await axios.get(api_url, {
        params: { teamName: teamName },
      });
      setCheerSongs(response.data);
      setCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cheer song:", error);
    }
  };

  useEffect(() => {
    getCheerSong();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false); // 페이지 떠날 때 음악 상태 초기화
      setCurrentIndex(null); // 첫 번째 노래로 초기화
    };
  }, []);

  const playSong = useCallback(
    (index: number) => {
      const song = cheerSongs[index];
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(song.url);
      audioRef.current = audio;
      setProgress(0);
      setIsPlaying(true); // 노래 재생 상태

      audio.play();
      audio.addEventListener("ended", () => setCurrentIndex((index + 1) % cheerSongs.length));
      audio.addEventListener("timeupdate", () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      });
    },
    [cheerSongs],
  );

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying); // play/pause 상태 변경
    }
  };

  const handlePrevious = () => {
    if (currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + cheerSongs.length) % cheerSongs.length;
      setCurrentIndex(prevIndex);
      playSong(prevIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % cheerSongs.length;
      setCurrentIndex(nextIndex);
      playSong(nextIndex);
    }
  };

  // 인덱스가 변경될 때마다 노래 재생
  useEffect(() => {
    if (currentIndex !== null && cheerSongs.length > 0) {
      playSong(currentIndex);
    }
  }, [currentIndex, cheerSongs, playSong]);

  return (
    <>
      <PageName label="응원가" />
      <ClubChangeButton club={club} onClick={goClubSelect} />
      <div className="mt-5 mb-7">
        {currentIndex !== null && (
          <MusicController
            title={cheerSongs[currentIndex].title}
            club={club}
            audioRef={audioRef}
            progress={progress}
            isPlaying={isPlaying} // 상태 전달
            onPrevious={handlePrevious}
            onNext={handleNext}
            handlePlayPause={handlePlayPause} // 재생/일시정지 핸들러 전달
          />
        )}
      </div>
      <CountSong count={count} />
      {cheerSongs.map((song, index) => (
        <CheerSongComponent
          key={index}
          club={club}
          title={song.title}
          url={song.url}
          onSingClick={() => setCurrentIndex(index)}
          showIcon={true}
          all={cheerSongs}
        />
      ))}
    </>
  );
};

export default CheerSong;
