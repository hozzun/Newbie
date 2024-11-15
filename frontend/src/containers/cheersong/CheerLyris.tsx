import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CheerSong from "../../components/cheersong/CheerSong";
import CheerLyrisComponent from "../../components/cheersong/CheerLyris";
import MusicControll from "../../components/cheersong/MusicControll";

type TeamName = "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";

interface CheerSongData {
  title: string;
  url: string;
  lyrics: string
}

const CheerLyris = () => {
  const location = useLocation();
  const { club, title, lyrics, all } = location.state as { club: TeamName; title: string; lyrics: string; all: CheerSongData[] };
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentLyrics, setCurrentLyrics] = useState(lyrics)
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (all && all.length > 0) {
      setCurrentTitle(title);
      setCurrentLyrics(lyrics)
      const currentIndex = all.findIndex(song => song.title === title);
      setCurrentSongIndex(currentIndex !== -1 ? currentIndex : 0);
    }
  }, [title, all]);

  // 노래 재생
  const onClickPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 노래 정지
  const onClickPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 상태 바 업데이트
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  // 이전 노래로 이동
  const onClickLeft = () => {
    if (currentSongIndex > 0) {
      const newIndex = currentSongIndex - 1;
      setCurrentSongIndex(newIndex);
      setCurrentTitle(all[newIndex].title);
      setCurrentLyrics(all[newIndex].lyrics)
      setProgress(0);
    }
  };

  // 다음 노래로 이동
  const onClickRight = () => {
    if (currentSongIndex < (all ? all.length - 1 : 0)) {
      const newIndex = currentSongIndex + 1;
      setCurrentSongIndex(newIndex);
      setCurrentTitle(all[newIndex].title);
      setCurrentLyrics(all[newIndex].lyrics)
      setProgress(0);
    }
  };

  // currentSongIndex가 유효한지 체크
  const currentSong = all && all[currentSongIndex];

  // audio가 로드된 후에 재생하도록 설정
  const handleAudioCanPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="m-5">
        <CheerSong club={club} title={currentTitle} showIcon={false} />
        <CheerLyrisComponent lyrics={currentLyrics} />
        {/* 상태 바 */}
        <div className="w-full bg-gray-200 rounded-full h-1 mt-10">
          <div 
            className="bg-gray-400 h-1 rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div>
          <MusicControll 
            onClickLeft={onClickLeft} 
            onClickPause={onClickPause} 
            onClickRight={onClickRight} 
            onClickPlay={onClickPlay} 
            isPlaying={isPlaying}
          />
        </div>
      </div>
      {currentSong && (
        <audio 
          ref={audioRef} 
          src={currentSong.url} 
          onTimeUpdate={handleTimeUpdate} // 시간 업데이트 이벤트 핸들러
          onEnded={onClickRight} // 노래 끝났을 때 자동으로 다음 노래로 이동
          onCanPlay={handleAudioCanPlay} // audio가 로드된 후에 재생 시작
        />
      )}
    </>
  );
};

export default CheerLyris;
