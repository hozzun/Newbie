interface ModalImageProps {
  imageUrl: string;
}

const ModalImage = (props: ModalImageProps) => {

  return (
    <div className="flex flex-col justify-center items-center">
      <img src={props.imageUrl} className="mb-5 w-80 h-64 rounded-2xl"/>
    </div>
  )
}

export default ModalImage