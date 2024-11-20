interface ModalImageProps {
  imageUrl: string;
}

const ModalImage = (props: ModalImageProps) => {

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <img src={props.imageUrl} className="mb-5 rounded-2xl"/>
    </div>
  )
}

export default ModalImage