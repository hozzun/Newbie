import { useState } from "react";
import SignupComponent from "../../components/auth/Signup";
import { BUTTON_VARIANTS } from "../../components/common/variants";

const Signup = () => {
  const [buttonVariant, setButtonVariant] = useState<BUTTON_VARIANTS>(BUTTON_VARIANTS.primary);
  return (
    <>
      <SignupComponent buttonVariant={buttonVariant} />
    </>
  );
};

export default Signup;
