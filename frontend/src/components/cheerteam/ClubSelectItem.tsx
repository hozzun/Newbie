import { useState } from 'react';
import ClubLogos from "../../util/ClubLogos";
import ClubSelectItem from "../common/ClubSelectItem";

const CheerTeam = () => {
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

  const handleSelectDoosan = () => {
    setSelectedDoosan(!selectedDoosan);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectHanwha = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(!selectedHanwha)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectSamsung = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(!selectedSamsung)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectLotte = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(!selectedLotte)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectLg = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(!selectedLg)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectSsg = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(!selectedSsg)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectKt = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(!selectedKt)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectNc = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(!selectedNc)
    setSelectedKiwoom(false)
    setSelectedKia(false)
  }

  const handleSelectKiwoom = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(!selectedKiwoom)
    setSelectedKia(false)
  }

  const handleSelectKia = () => {
    setSelectedDoosan(false);
    setSelectedHanwha(false)
    setSelectedSamsung(false)
    setSelectedLotte(false)
    setSelectedLg(false)
    setSelectedSsg(false)
    setSelectedKt(false)
    setSelectedNc(false)
    setSelectedKiwoom(false)
    setSelectedKia(!selectedKia)
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <ClubSelectItem
        clubColor="doosan"
        width='w-2/5'
        logo={ClubLogos.doosan}
        isSelected={selectedDoosan}
        onSelect={handleSelectDoosan}
      />
      <ClubSelectItem
        clubColor="hanhwa"
        width='w-2/5'
        logo={ClubLogos.hanhwa}
        isSelected={selectedHanwha}
        onSelect={handleSelectHanwha}
      />
      <ClubSelectItem
        clubColor="samsung"
        width='w-2/5'
        logo={ClubLogos.samsung}
        isSelected={selectedSamsung}
        onSelect={handleSelectSamsung}
      />
      <ClubSelectItem
        clubColor="lotte"
        width='w-2/5'
        logo={ClubLogos.lotte}
        isSelected={selectedLotte}
        onSelect={handleSelectLotte}
      />
      <ClubSelectItem
        clubColor="lg"
        width='w-2/5'
        logo={ClubLogos.lg}
        isSelected={selectedLg}
        onSelect={handleSelectLg}
      />
      <ClubSelectItem
        clubColor="ssg"
        width='w-2/5'
        logo={ClubLogos.ssg}
        isSelected={selectedSsg}
        onSelect={handleSelectSsg}
      />
      <ClubSelectItem
        clubColor="kt"
        width='w-2/5'
        logo={ClubLogos.kt}
        isSelected={selectedKt}
        onSelect={handleSelectKt}
      />
      <ClubSelectItem
        clubColor="nc"
        width='w-2/5'
        logo={ClubLogos.nc}
        isSelected={selectedNc}
        onSelect={handleSelectNc}
      />
      <ClubSelectItem
        clubColor="kiwoom"
        width='w-2/5'
        logo={ClubLogos.kiwoom}
        isSelected={selectedKiwoom}
        onSelect={handleSelectKiwoom}
      />
      <ClubSelectItem
        clubColor="kia"
        width='w-2/5'
        logo={ClubLogos.kia}
        isSelected={selectedKia}
        onSelect={handleSelectKia}
      />                                                
    </div>
  );
}

export default CheerTeam;
