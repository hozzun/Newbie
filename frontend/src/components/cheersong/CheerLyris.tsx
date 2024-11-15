interface CheerLyricsProps {
  lyrics?: string;
}

const CheerLyrics = (props: CheerLyricsProps) => {

  return (
    <div className="flex justify-center items-center w-full font-kbogothiclight text-gray-600 bg-gray-100 mt-5 whitespace-pre-line rounded-2xl p-10">
      {props.lyrics}
    </div>
  );
};

export default CheerLyrics;
