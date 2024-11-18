interface TeamChatData {
  id: string;
  teamName: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface TeamChatProps {
  chatData: TeamChatData;
  logoSrc: string;
  onChatClick: (id: string) => void;
}

const TeamChat = ({ chatData, logoSrc, onChatClick }: TeamChatProps) => {
  return (
    <div
      onClick={() => onChatClick(chatData.id)}
      className="flex items-center w-full h-20 px-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="relative w-14 h-14 rounded-3xl overflow-hidden flex-shrink-0 flex items-center justify-center border p-1">
        <img
          src={logoSrc}
          alt={`${chatData.teamName} 로고`}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 ml-4">
        <div className="flex justify-between items-center">
          <h3 className="font-kbogothicmedium text-gray-900">{chatData.teamName}</h3>
          <span className="font-kbogothiclight text-xs text-gray-500">
            {chatData.lastMessageTime}
          </span>
        </div>
        <p className="font-kbogothiclight text-xs text-gray-500 truncate mt-1">
          {chatData.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default TeamChat;
