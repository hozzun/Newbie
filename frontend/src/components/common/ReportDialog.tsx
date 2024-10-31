import Dialog from "./Dialog";
import { ButtonProps } from "./Button";
import { BUTTON_VARIANTS } from "./variants";

interface ReportDialogProps {
  userNickname: string;
  object: string;
}

const ReportDialog = (props: ReportDialogProps) => {
  const body: JSX.Element = (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center">
        <p className="text-xs font-kbogothicmedium text-gray-700">{props.userNickname}</p>
        <p className="text-xs font-kbogothiclight text-gray-700">
          님의 {props.object}를 신고하시겠습니까?
        </p>
      </div>
      <p className="text-xs font-kbogothiclight text-gray-700 mt-4 text-center">
        신고가 허위로 판단될 경우, 경고가 주어지며, 경고가 누적될 경우 운영정책에 따른 제재 조치가
        가해질 수 있습니다. 신중하게 신고해주세요.
      </p>
    </div>
  );

  const yesButton: ButtonProps = {
    variant: BUTTON_VARIANTS.error,
    children: "신고",
  };

  const noButton: ButtonProps = {
    variant: BUTTON_VARIANTS.second,
    children: "취소",
  };

  return (
    <Dialog title="주의해주세요!" body={body} yesButton={yesButton} noButton={noButton}></Dialog>
  );
};

export default ReportDialog;
