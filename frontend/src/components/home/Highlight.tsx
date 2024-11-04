// TODO: 동영상 재생 컴포넌트 및 기능 구현
export interface HighlightProps {
  url: string | null;
}

const Highlight = (props: HighlightProps) => {
  console.log(`하이라이트 영상 url: ${props.url}`);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">하이라이트</p>
      </div>
      <div className="w-full aspect-video bg-gray-500 mt-3 rounded-lg"></div>
    </div>
  );
};

export default Highlight;
