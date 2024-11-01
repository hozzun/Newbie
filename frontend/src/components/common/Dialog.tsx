import Button, { ButtonProps } from "./Button";

interface DialogProps {
  title: string; // 제목
  body: React.ReactNode; // 본문
  yesButton: ButtonProps; // 네 버튼
  noButton: ButtonProps; // 아니오 버튼
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
            <Button
              className="w-1/2"
              variant={props.yesButton.variant}
              onClick={props.yesButton.onClick}
            >
              {props.yesButton.children}
            </Button>
            <Button
              className="w-1/2"
              variant={props.noButton.variant}
              onClick={props.noButton.onClick}
            >
              {props.noButton.children}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
