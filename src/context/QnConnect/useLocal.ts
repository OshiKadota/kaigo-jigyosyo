import { useState } from "react";

export const useLocal = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const onClickSideMenuControllButton = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  return { onClickSideMenuControllButton, isSideMenuOpen };
};
