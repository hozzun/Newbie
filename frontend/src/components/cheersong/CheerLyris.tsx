interface CheerLyrisProps {
  lyris?: string;
}

const CheerLyris = (props: CheerLyrisProps) => {

  return (
    <>
      <div className="flex justify-center items-center w-full h-96 font-kbogothiclight text-gray-600 bg-gray-100 mt-5 rounded-2xl">
        {props.lyris}
      </div>
    </>
  )
}

export default CheerLyris
