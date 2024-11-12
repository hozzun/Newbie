import CustomError from "./CustomError";

interface Id {
  [key: string]: number;
}

const ClubId: Id = {
  kia: 1,
  samsung: 2,
  lg: 3,
  doosan: 4,
  kt: 5,
  ssg: 6,
  lotte: 7,
  hanwha: 8,
  nc: 9,
  kiwoom: 10,
};

export const getClubIdByNum = (value: number): string => {
  const clubId = Object.entries(ClubId).find(([, v]) => v === value)?.[0];
  if (!clubId) {
    throw new CustomError("[ERROR] 구단 ID 변환 과정");
  }

  return clubId;
};

export const getIdByNum = (value: number): string | null => {
  const clubId = Object.entries(ClubId).find(([, v]) => v === value)?.[0];
  if (!clubId) {
    console.warn("[WARN] 구단 ID 변환 실패: 유효하지 않은 ID입니다.");
    return null;
  }
  return clubId;
};


export default ClubId;
