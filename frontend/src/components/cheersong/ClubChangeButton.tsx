import ClubFullName from "../../util/ClubFullName";
import ClubLogos from "../../util/ClubLogos";
import ClubChangeButtonCommon from "../common/ClubChangeButton";

interface ClubChangeButtonProps {
  club: "doosan" | "hanwha" | "kia" | "kiwoom" | "kt" | "lg" | "lotte" | "nc" | "samsung" | "ssg";
  onClick: () => void;
}

const ClubChangeButton = (props: ClubChangeButtonProps) => {
  // TODO: 유저 정보 가져오기

  return (
    <>
      <ClubChangeButtonCommon
        clubColor={props.club}
        logo={ClubLogos[props.club]}
        club={ClubFullName[props.club]}
        onClick={props.onClick}
      />
    </>
  );
};

export default ClubChangeButton;
