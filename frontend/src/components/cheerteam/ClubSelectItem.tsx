import { useState } from "react";
import ClubLogos from "../../util/ClubLogos";
import ClubSelectItemCommon from "../common/ClubSelectItem";
import Button from "../../components/common/Button";
import { BUTTON_VARIANTS } from "../../components/common/variants";

const ClubSelectItem = () => {
  const [selectedDoosan, setSelectedDoosan] = useState<boolean>(false);
  const [selectedHanwha, setSelectedHanwha] = useState<boolean>(false);
  const [selectedSamsung, setSelectedSamsung] = useState<boolean>(false);
  const [selectedLotte, setSelectedLotte] = useState<boolean>(false);
  const [selectedLg, setSelectedLg] = useState<boolean>(false);
  const [selectedSsg, setSelectedSsg] = useState<boolean>(false);
  const [selectedKt, setSelectedKt] = useState<boolean>(false);
  const [selectedNc, setSelectedNc] = useState<boolean>(false);
  const [selectedKiwoom, setSelectedKiwoom] = useState<boolean>(false);
  const [selectedKia, setSelectedKia] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isCheerButton, setIsCheerButton] = useState(BUTTON_VARIANTS.second);

  const onClick = () => {
    console.log("클릭");
    // TODO: 홈으로 이동
  };

  const handleSelectDoosan = () => {
    setSelectedDoosan(true);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectHanwha = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(true);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectSamsung = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(true);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectLotte = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(true);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectLg = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(true);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectSsg = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(true);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectKt = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(true);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectNc = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(true);
    setSelectedKiwoom(false);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectKiwoom = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(true);
    setSelectedKia(false);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  const handleSelectKia = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false);
    setSelectedSamsung(false);
    setSelectedLotte(false);
    setSelectedLg(false);
    setSelectedSsg(false);
    setSelectedKt(false);
    setSelectedNc(false);
    setSelectedKiwoom(false);
    setSelectedKia(true);
    setIsDisabled(false);
    setIsCheerButton(BUTTON_VARIANTS.primary);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <ClubSelectItemCommon
        clubColor="doosan"
        width="w-2/5"
        logo={ClubLogos.doosan}
        isSelected={selectedDoosan}
        onSelect={handleSelectDoosan}
      />
      <ClubSelectItemCommon
        clubColor="hanhwa"
        width="w-2/5"
        logo={ClubLogos.hanhwa}
        isSelected={selectedHanwha}
        onSelect={handleSelectHanwha}
      />
      <ClubSelectItemCommon
        clubColor="samsung"
        width="w-2/5"
        logo={ClubLogos.samsung}
        isSelected={selectedSamsung}
        onSelect={handleSelectSamsung}
      />
      <ClubSelectItemCommon
        clubColor="lotte"
        width="w-2/5"
        logo={ClubLogos.lotte}
        isSelected={selectedLotte}
        onSelect={handleSelectLotte}
      />
      <ClubSelectItemCommon
        clubColor="lg"
        width="w-2/5"
        logo={ClubLogos.lg}
        isSelected={selectedLg}
        onSelect={handleSelectLg}
      />
      <ClubSelectItemCommon
        clubColor="ssg"
        width="w-2/5"
        logo={ClubLogos.ssg}
        isSelected={selectedSsg}
        onSelect={handleSelectSsg}
      />
      <ClubSelectItemCommon
        clubColor="kt"
        width="w-2/5"
        logo={ClubLogos.kt}
        isSelected={selectedKt}
        onSelect={handleSelectKt}
      />
      <ClubSelectItemCommon
        clubColor="nc"
        width="w-2/5"
        logo={ClubLogos.nc}
        isSelected={selectedNc}
        onSelect={handleSelectNc}
      />
      <ClubSelectItemCommon
        clubColor="kiwoom"
        width="w-2/5"
        logo={ClubLogos.kiwoom}
        isSelected={selectedKiwoom}
        onSelect={handleSelectKiwoom}
      />
      <ClubSelectItemCommon
        clubColor="kia"
        width="w-2/5"
        logo={ClubLogos.kia}
        isSelected={selectedKia}
        onSelect={handleSelectKia}
      />
      <Button
        className="flex justify-center items-center w-4/5 h-14 mt-5"
        variant={isCheerButton}
        children="응원하러 가기"
        disabled={isDisabled}
        onClick={onClick}
      />
    </div>
  );
};

export default ClubSelectItem;
