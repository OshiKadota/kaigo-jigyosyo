"use client";

import { QnConnectContext } from "@/context/QnConnect";
import { useContext } from "react";
import Button from "../atoms/Button";
import { useTopPage } from "../TopPage/useTopPage";
export default function TopPage() {
  const { isSideMenuOpen } = useContext(QnConnectContext);
  const { jumpToMapPage, jumpToListPage, jumpToAddFacilitytyPage } =
    useTopPage();

  const isOpen = (val: boolean) => {
    if (val === true) {
      return "open";
    }
    return "close";
  };

  return (
    <div>
      <div>
        <p>top page</p>
      </div>
      <div>
        <p>{isOpen(isSideMenuOpen)}</p>
      </div>
      <div>
        <Button onClick={jumpToMapPage} value={"map page"} />
      </div>
      <div className="mt-6">
        <Button onClick={jumpToListPage} value={"リストページ"} />
      </div>
      <div className="mt-6">
        <Button onClick={jumpToAddFacilitytyPage} value={"施設追加ページ"} />
      </div>
    </div>
  );
}
