interface ModalFormProps {
  date: string;
  team1: string;
  team2: string;
  isOpen: boolean; // 모달 열림 상태
}

const ModalForm = (props: ModalFormProps) => {
  if (!props.isOpen) return null;

  return (
    <div className="flex flex-col items-center justify-center font-kbogothicbold mt-10 mb-5">
      <label className="mb-4">{props.date}</label>
      <label className="text-xl mb-4 text-2xl">
        {props.team1} VS {props.team2}
      </label>
    </div>
  );
};

export default ModalForm;
