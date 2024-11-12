import Comment from "../../assets/icons/comment-solid.svg?react";
import Trash from "../../assets/icons/trash.svg?react"

interface CommentProps {
  time: string;
  comment: string;
  onClick: () => void;
}

const MyActiveComment = ({time, comment, onClick}: CommentProps) => {

  return (
    <div className="flex flex-col m-3">
      <p className="font-kbogothicmedium text-gray-600 text-sm">{time}</p>
      <div className="flex flex-row justify-between justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="my-3">
            <Comment className="w-6 h-6 text-[#7FAAFF]"/>
            <p className="font-kbogothicmedium text-gray-600 text-sm">댓글</p>
          </div>
          <p className="font-kbogothiclight text-gray-600 ml-5">{comment}</p>
        </div>
        <div onClick={onClick} >
          <Trash className="w-4 h-4 hover:cursor-pointer text-gray-400"/>
        </div>
      </div>
    </div>
  )
}

export default MyActiveComment