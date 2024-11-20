import ReactPlayer from "react-player";

export interface HighlightProps {
  url: string | null;
}

const Highlight = (props: HighlightProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-8">
      <div className="flex justify-start w-full">
        <p className="text-2xl font-kbogothicbold text-gray-700">하이라이트</p>
      </div>
      <div className="w-full aspect-video overflow-hidden mt-3 rounded-lg">
        {props.url && (
          <ReactPlayer
            className="rounded-lg"
            url={props.url}
            controls
            width={"100%"}
            height={"100%"}
          />
        )}
      </div>
    </div>
  );
};

export default Highlight;
