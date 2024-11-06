interface CountSongProps {
  count: number;
}

const CountSong = ({count}: CountSongProps) => {

  return (
    <div className="flex flex-start font-kbogothicmedium text-gray-600 my-3">
      <p>총 {count}곡</p>
    </div>
  )
}

export default CountSong