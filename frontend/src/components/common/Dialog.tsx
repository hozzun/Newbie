import Button, { ButtonProps } from "./Button";

interface DialogProps {
  title: string;
  body: React.ReactNode;
  yesButton: ButtonProps;
  noButton: ButtonProps;
}

const Dialog = (props: DialogProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="flex flex-col p-6 items-center w-[80%] max-w-md rounded-lg bg-white">
          <p className="text-base font-kbogothicmedium text-gray-700">{props.title}</p>
          <div className="mt-8">{props.body}</div>
          <div className="flex flex-row mt-8 w-full gap-3">
            <Button className="w-1/2" variant={props.yesButton.variant}>
              {props.yesButton.children}
            </Button>
            <Button className="w-1/2" variant={props.noButton.variant}>
              {props.noButton.children}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
