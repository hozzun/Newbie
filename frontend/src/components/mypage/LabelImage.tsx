interface LabelImageProps {
  date: string;
  imageUrl: string;
}

const LabelImage = (props: LabelImageProps) => {

  return (
    <div className="flex flex-col justify-center items-center">
      <label className="m-5 font-kbogothicbold text-2xl text-gray-600">{props.date}</label>
      <img src={props.imageUrl} className="m-5 w-80 h-64 rounded-2xl"/>
    </div>
  )
}

export default LabelImage