import { useState } from "react";
import ClubLogos from "../../util/ClubLogos";
import ClubSelectItemCommon from "../common/ClubSelectItem";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";

interface ClubSelectItemProps {
  onClick: (selectedClub: string) => void;
}

const ClubSelectItem = (props: ClubSelectItemProps) => {
  const [selectedClub, setSelectedClub] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isCheerButton, setIsCheerButton] = useState(BUTTON_VARIANTS.second);

  const handleSelectClub = (club: string) => {
    setSelectedClub(club);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <ClubSelectItemCommon
        clubColor="doosan"
        width="w-2/5"
        logo={ClubLogos.doosan}
        isSelected={selectedClub === "doosan"}
        onSelect={() => handleSelectClub("doosan")}
      />
      <ClubSelectItemCommon
        clubColor="hanwha"
        width="w-2/5"
        logo={ClubLogos.hanwha}
        isSelected={selectedClub === "hanwha"}
        onSelect={() => handleSelectClub("hanwha")}
      />
      <ClubSelectItemCommon
        clubColor="samsung"
        width="w-2/5"
        logo={ClubLogos.samsung}
        isSelected={selectedClub === "samsung"}
        onSelect={() => handleSelectClub("samsung")}
      />
      <ClubSelectItemCommon
        clubColor="lotte"
        width="w-2/5"
        logo={ClubLogos.lotte}
        isSelected={selectedClub === "lotte"}
        onSelect={() => handleSelectClub("lotte")}
      />
      <ClubSelectItemCommon
        clubColor="lg"
        width="w-2/5"
        logo={ClubLogos.lg}
        isSelected={selectedClub === "lg"}
        onSelect={() => handleSelectClub("lg")}
      />
      <ClubSelectItemCommon
        clubColor="ssg"
        width="w-2/5"
        logo={ClubLogos.ssg}
        isSelected={selectedClub === "ssg"}
        onSelect={() => handleSelectClub("ssg")}
      />
      <ClubSelectItemCommon
        clubColor="kt"
        width="w-2/5"
        logo={ClubLogos.kt}
        isSelected={selectedClub === "kt"}
        onSelect={() => handleSelectClub("kt")}
      />
      <ClubSelectItemCommon
        clubColor="nc"
        width="w-2/5"
        logo={ClubLogos.nc}
        isSelected={selectedClub === "nc"}
        onSelect={() => handleSelectClub("nc")}
      />
      <ClubSelectItemCommon
        clubColor="kiwoom"
        width="w-2/5"
        logo={ClubLogos.kiwoom}
        isSelected={selectedClub === "kiwoom"}
        onSelect={() => handleSelectClub("kiwoom")}
      />
      <ClubSelectItemCommon
        clubColor="kia"
        width="w-2/5"
        logo={ClubLogos.kia}
        isSelected={selectedClub === "kia"}
        onSelect={() => handleSelectClub("kia")}
      />
      <Button
        className="flex justify-center items-center w-4/5 h-14 mt-5"
        variant={isCheerButton}
        children="응원하러 가기"
        disabled={isDisabled}
        onClick={() => props.onClick(selectedClub)}
      />
    </div>
  );
};

export default ClubSelectItem;
