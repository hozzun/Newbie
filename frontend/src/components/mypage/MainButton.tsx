const MainButton = () => {

  return (
    <div className="font-kbogothicbold text-gray-600 m-7">
      <div className="flex justify-between gap-5 mb-7">
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl">포토카드</div>
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl">게시글</div>
      </div>
      <div className="flex justify-between gap-5 mb-7">
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl">활동</div>
        <div className="flex justify-center items-center w-1/2 h-10 bg-gray-100 rounded-2xl">스크랩</div>
      </div>
    </div>
  )
}

export default MainButton