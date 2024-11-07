const PlayerHightlightItem = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full hover:cursor-pointer">
      <div className="w-full aspect-video bg-gray-500 rounded-lg"></div>
      <p className="text-sm font-kbogothiclight text-gray-700 line-clamp-2 mt-1">
        {"김광현 앞세워 ‘쓰윽’ 올라간 SSG ‘가을 야구’ 보인다! [9시 뉴스] / KBS 2024.09.23."}
      </p>
    </div>
  );
};

export default PlayerHightlightItem;
