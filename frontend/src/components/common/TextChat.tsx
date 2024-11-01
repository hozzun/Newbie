import { useState } from 'react';

interface  TextChatProps {
  label?: string;
}

const TextChat = ({ label }: TextChatProps) => {
  const [comment, setComment] = useState('');

  const handleButtonClick = () => {
    if (comment.trim() !== '') {
      setComment('');
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-white font-kbogothiclight rounded-t-2xl shadow-md w-full h-14">
      <input
        type="text"
        className="bg-gray-100 text-gray-700 font-kbogothiclight placeholder-gray-300 text-sm pl-3 h-10 outline-none rounded-2xl w-3/4"
        placeholder={label}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
          className={`ml-3 rounded-full text-white w-10 h-10 ${comment ? 'bg-green-900' : 'bg-gray-100'}`}
          onClick={handleButtonClick}
          disabled={!comment}
      ></button>
    </div>
  );
};

export default TextChat;
