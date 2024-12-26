import { Facility } from "@/types/facility.types";
import { useState } from "react";

export const useFacilityInfoDailogArticle = (facility: Facility) => {
  const [formFacility, setFormFacility] = useState<Facility>(facility);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] =
    useState<boolean>(false);
  const onChangeTextField = (event: string, field: keyof Facility) => {
    setFormFacility({
      ...formFacility,
      [field]: event,
    });
  };
  return {
    formFacility,
    onChangeTextField,
    isOpenConfirmDialog,
    setIsOpenConfirmDialog,
  };
};
