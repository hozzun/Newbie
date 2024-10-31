import React, { useState } from 'react';

interface BoxProps {
  label?: string;
}

const ChatBox: React.FC<BoxProps> = ({ label }) => {
  const [comment, setComment] = useState('');

  const handleButtonClick = () => {
    if (comment.trim() !== '') {
      setComment('');
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-white font-kbogothiclight"
      style={{
        width: '390px',
        height: '60px',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <input
        type="text"
        className="bg-gray-100 text-gray-700 font-kbogothiclight placeholder-gray-300 text-sm pl-3 h-10"
        style={{width: '291px', borderRadius: '16px', outline: 'none'}}
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

export default ChatBox;
