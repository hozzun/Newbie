interface ModalFormProps {
  date: string;
  team1: string;
  team2: string;
}

const ModalForm = (props: ModalFormProps) => {

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
