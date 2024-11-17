import { useState } from "react";
import Button, {ButtonProps} from "../common/Button"
import { BUTTON_VARIANTS } from "../common/variants"
import Dialog from "../common/Dialog";
import axiosInstance from "../../util/axiosInstance";

const OutButton = () => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);

  const goLogout = () => {
    setLogoutDialog(true)
  };

  const goDelete = () => {
    setRemoveDialog(true)
  };

  const patchDelete = async () => {
  
    try {
      const response = await axiosInstance.patch("/api-user/users/resign");
      console.log(response);
    } catch (error) {
      console.error("Error fetching cheer song:", error);
    }
  };

  // TODO: 로그아웃 API 연결
  const yesLogout: ButtonProps = {
    variant: BUTTON_VARIANTS.primary,
    children: "네",
    onClick: () => console.log("로그아웃"),
  };

  const yesRemove: ButtonProps = {
    variant: BUTTON_VARIANTS.primary,
    children: "네",
    onClick: () => patchDelete()
  };

  const noLogout: ButtonProps = {
    variant: BUTTON_VARIANTS.yellowGreen,
    children: "아니오",
    onClick: () => setLogoutDialog(false)
  };

  const noRemove: ButtonProps = {
    variant: BUTTON_VARIANTS.yellowGreen,
    children: "아니오",
    onClick: () => setRemoveDialog(false)
  };

  return (
    <div className="flex justify-center items-center flex-row">
      <Button 
      className="flex justify-center items-center w-1/2 h-10 my-2 mr-2 hover:cursor-pointer"
      variant={BUTTON_VARIANTS.primary} children="로그아웃" onClick={goLogout} />
      <Button 
      className="flex justify-center items-center w-1/2 h-10 my-2 ml-2 bg-green-50 hover:cursor-pointer"
      variant={BUTTON_VARIANTS.primaryText} children="회원탈퇴" onClick={goDelete} />
      {logoutDialog && (
        <Dialog 
          title="로그아웃" 
          body="정말 로그아웃 하시겠습니까?" 
          yesButton={yesLogout} 
          noButton={noLogout}
        />
      )}
      {removeDialog && (
        <Dialog 
          title="회원탈퇴" 
          body="정말 회원탈퇴 하시겠습니까?" 
          yesButton={yesRemove} 
          noButton={noRemove}
        />
      )}
    </div>
  )
}

export default OutButton