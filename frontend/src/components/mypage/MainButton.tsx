interface MainButtonProps {
  photoClick: () => void;
  writeClick: () => void;
  activeClick: () => void;
  scrapClick: () => void;
}

const MainButton = (props: MainButtonProps) => {

  return (
    <div className="font-kbogothicbold text-gray-600 mt-7">
      <div className="flex justify-between gap-5 mb-7">
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl hover:cursor-pointer" onClick={props.photoClick}>포토카드</div>
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl hover:cursor-pointer" onClick={props.writeClick}>게시글</div>
      </div>
      <div className="flex justify-between gap-5 mb-7">
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl hover:cursor-pointer" onClick={props.activeClick}>활동</div>
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl hover:cursor-pointer" onClick={props.scrapClick}>스크랩</div>
      </div>
    </div>
  )
}

export default MainButton