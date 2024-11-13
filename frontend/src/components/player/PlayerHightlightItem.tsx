import ReactPlayer from "react-player/lazy";
import { Video } from "../../containers/player/Player";

interface PlayerHighlightItemProps {
  playerHighlight: Video;
}

const PlayerHightlightItem = (props: PlayerHighlightItemProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full hover:cursor-pointer">
      <div className="w-full aspect-video rounded-lg overflow-hidden">
        <ReactPlayer
          className="rounded-lg"
          url={props.playerHighlight.url}
          controls
          width={"100%"}
          height={"100%"}
        />
      </div>
      <p
        className="text-sm font-kbogothiclight text-gray-700 line-clamp-2 mt-1"
        dangerouslySetInnerHTML={{ __html: props.playerHighlight.title }}
      />
    </div>
  );
};

export default PlayerHightlightItem;
