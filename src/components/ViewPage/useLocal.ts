import { initialFacilityInfo } from "@/constants/facility.constants";
import { useFacilityRefineQueryParams } from "@/hooks/useFacilityRefineQueryParams";
import { db } from "@/lib/firebase";
import { FacilitiesRepository } from "@/repository/FacilitiesRepository";
import { Facility, FacilityMajorType } from "@/types/facility.types";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SELECTED_FACILITY_REFINE_MAJOR_TYPES } from "../FacilityRefineSearchForm/FacilityRefineSearchForm.constants";
import {
  CurrentMajorType,
  CurrentMiddleType,
  SelectedFacilityCareMiddleTypes,
  SelectedFacilityRefineMajorType,
  SelectedHomeCareMiddleTypes,
  SelectedMedicalCareMiddleTypes,
} from "../FacilityRefineSearchForm/FacilityRefineSearchForm.type";

export const useLocal = () => {
  const {
    setQueryParamsBySelectedMiddleType,
    searchParams,
    getSelectedHomeCareMiddleTypeByQueryParams,
    getSelectedMedicalCareMiddleTypeByQueryParams,
    getSelectedFacilityCareMiddleTypeByQueryParams,
    getSelectedMajorType,
  } = useFacilityRefineQueryParams();
  const facilitiesRepository = new FacilitiesRepository(db);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isFacilityEditDialogOpen, setIsFacilityEditDialogOpen] =
    useState<boolean>(false);
  const [isRefineSearchDialogOpen, setIsRefineSearchDialogOpen] =
    useState<boolean>(false);
  const [facilityInfoDialogTarget, setFacilityInfoDialogTarget] =
    useState<Facility>(initialFacilityInfo);
  const [selectedFacilityRefineMajorType, setSelectedFacilityRefineMajorType] =
    useState<SelectedFacilityRefineMajorType>("ALL");
  const [
    selectedHomeCareRefineMiddleType,
    setSelectedHomeCareRefineMiddleType,
  ] = useState<SelectedHomeCareMiddleTypes[]>([]);
  const [
    selectedMedicalCareRefineMiddleType,
    setSelectedMedicalCareRefineMiddleType,
  ] = useState<SelectedMedicalCareMiddleTypes[]>([]);
  const [
    selectedFacilityCareRefineMiddleType,
    setSelectedFacilityCareRefineMiddleType,
  ] = useState<SelectedFacilityCareMiddleTypes[]>([]);
  const [currentMajorType, setCurrentMajorType] =
    useState<CurrentMajorType>("ALL");
  const [currentMiddleType, setCurrentMiddleType] = useState<
    CurrentMiddleType[]
  >([]);
  const disableRefineButton = useMemo((): boolean => {
    if (selectedFacilityRefineMajorType === "HOME_CARE_SERVICE") {
      return selectedHomeCareRefineMiddleType.length === 0;
    }
    if (selectedFacilityRefineMajorType === "MEDICAL_CARE_SERVICE") {
      return selectedMedicalCareRefineMiddleType.length === 0;
    }
    if (selectedFacilityRefineMajorType === "FACILITY_SERVICE") {
      return selectedFacilityCareRefineMiddleType.length === 0;
    }
    return false;
  }, [
    selectedHomeCareRefineMiddleType,
    selectedMedicalCareRefineMiddleType,
    selectedFacilityCareRefineMiddleType,
    selectedFacilityRefineMajorType,
  ]);

  const onChangeMiddleTypeCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    majorType: FacilityMajorType
  ) => {
    const checkedValue = event.target.value;
    if (majorType === "HOME_CARE_SERVICE") {
      setMiddleTypeValue(
        selectedHomeCareRefineMiddleType,
        checkedValue as SelectedHomeCareMiddleTypes,
        (newValue: SelectedHomeCareMiddleTypes[]) =>
          setSelectedHomeCareRefineMiddleType(newValue)
      );
    }
    if (majorType === "MEDICAL_CARE_SERVICE") {
      setMiddleTypeValue(
        selectedMedicalCareRefineMiddleType,
        checkedValue as SelectedMedicalCareMiddleTypes,
        (newValue: SelectedMedicalCareMiddleTypes[]) =>
          setSelectedMedicalCareRefineMiddleType(newValue)
      );
    }
    if (majorType === "FACILITY_SERVICE") {
      setMiddleTypeValue(
        selectedFacilityCareRefineMiddleType,
        checkedValue as SelectedFacilityCareMiddleTypes,
        (newValue: SelectedFacilityCareMiddleTypes[]) =>
          setSelectedFacilityCareRefineMiddleType(newValue)
      );
    }
  };

  const setMiddleTypeValue = <
    T extends
      | SelectedFacilityCareMiddleTypes
      | SelectedMedicalCareMiddleTypes
      | SelectedHomeCareMiddleTypes
  >(
    currentValue: T[],
    selectedValue: T,
    setCallback: (newValue: T[]) => void
  ) => {
    const newCheckedValues: typeof currentValue = currentValue.includes(
      selectedValue
    )
      ? currentValue.filter((v) => v !== selectedValue)
      : [...currentValue, selectedValue];
    setCallback(newCheckedValues);
  };

  const onChangeSelectedFacilityRefineMajorType = (
    value: SelectedFacilityRefineMajorType
  ) => {
    setSelectedFacilityRefineMajorType(value);
  };

  const fetchAllFaclity = async () => {
    const faci = await facilitiesRepository.fetchAll();
    setFacilities(faci);
  };

  const openFacilityInfoDialog = (index: number) => {
    setFacilityInfoDialogTarget(facilities[index]);
    setIsFacilityEditDialogOpen(true);
  };

  const onClickFacilityUpdate = async (facility: Facility) => {
    try {
      await facilitiesRepository.setDocById(facility);
      await fetchAllFaclity();
    } catch (error) {
      console.error(error);
    } finally {
      setIsFacilityEditDialogOpen(false);
    }
  };

  const onClickFacilityDelete = async (documentId: string) => {
    try {
      await facilitiesRepository.deleteDocById(documentId);
      await fetchAllFaclity();
    } catch (error) {
      console.error(error);
    } finally {
      setIsFacilityEditDialogOpen(false);
    }
  };

  const onClickRefineFacilityButton = () => {
    if (selectedFacilityRefineMajorType === "ALL") {
      setIsRefineSearchDialogOpen(false);
      setSelectedFacilityCareRefineMiddleType([]);
      setSelectedHomeCareRefineMiddleType([]);
      setSelectedMedicalCareRefineMiddleType([]);
      setQueryParamsBySelectedMiddleType(selectedFacilityRefineMajorType, []);
      return;
    }

    if (selectedFacilityRefineMajorType === "HOME_CARE_SERVICE") {
      setIsRefineSearchDialogOpen(false);
      setSelectedFacilityCareRefineMiddleType([]);
      setSelectedMedicalCareRefineMiddleType([]);
      setQueryParamsBySelectedMiddleType(
        selectedFacilityRefineMajorType,
        selectedHomeCareRefineMiddleType
      );
      return;
    }

    if (selectedFacilityRefineMajorType === "MEDICAL_CARE_SERVICE") {
      setIsRefineSearchDialogOpen(false);
      setSelectedFacilityCareRefineMiddleType([]);
      setSelectedHomeCareRefineMiddleType([]);
      setQueryParamsBySelectedMiddleType(
        selectedFacilityRefineMajorType,
        selectedMedicalCareRefineMiddleType
      );
      return;
    }

    if (selectedFacilityRefineMajorType === "FACILITY_SERVICE") {
      setIsRefineSearchDialogOpen(false);
      setSelectedHomeCareRefineMiddleType([]);
      setSelectedMedicalCareRefineMiddleType([]);
      setQueryParamsBySelectedMiddleType(
        selectedFacilityRefineMajorType,
        selectedFacilityCareRefineMiddleType
      );
      return;
    }
  };

  const fetchData = async (majorType: SelectedFacilityRefineMajorType) => {
    if (majorType === "ALL") {
      fetchAllFaclity();
      setCurrentMajorType("ALL");
      setCurrentMiddleType(["ALL"]);
      return;
    }
    if (majorType === "HOME_CARE_SERVICE") {
      const faci = await facilitiesRepository.fetchByMejorQuery(
        SELECTED_FACILITY_REFINE_MAJOR_TYPES.HOME_CARE_SERVICE,
        getSelectedHomeCareMiddleTypeByQueryParams(searchParams)
      );
      setFacilities(faci);
      setCurrentMajorType("HOME_CARE_SERVICE");
      setCurrentMiddleType(
        getSelectedHomeCareMiddleTypeByQueryParams(searchParams)
      );
      return;
    }
    if (majorType === "MEDICAL_CARE_SERVICE") {
      const faci = await facilitiesRepository.fetchByMejorQuery(
        SELECTED_FACILITY_REFINE_MAJOR_TYPES.HOME_CARE_SERVICE,
        getSelectedMedicalCareMiddleTypeByQueryParams(searchParams)
      );
      setFacilities(faci);
      setCurrentMajorType("MEDICAL_CARE_SERVICE");
      setCurrentMiddleType(
        getSelectedMedicalCareMiddleTypeByQueryParams(searchParams)
      );
      return;
    }
    if (majorType === "FACILITY_SERVICE") {
      const faci = await facilitiesRepository.fetchByMejorQuery(
        SELECTED_FACILITY_REFINE_MAJOR_TYPES.FACILITY_SERVICE,
        getSelectedFacilityCareMiddleTypeByQueryParams(searchParams)
      );
      setFacilities(faci);
      setCurrentMajorType("FACILITY_SERVICE");
      setCurrentMiddleType(
        getSelectedFacilityCareMiddleTypeByQueryParams(searchParams)
      );
      return;
    }
  };

  useEffect(() => {
    fetchData(getSelectedMajorType(searchParams));
  }, [searchParams]);

  return {
    facilities,
    isFacilityEditDialogOpen,
    setIsFacilityEditDialogOpen,
    facilityInfoDialogTarget,
    setFacilityInfoDialogTarget,
    openFacilityInfoDialog,
    onClickFacilityUpdate,
    onClickFacilityDelete,
    isRefineSearchDialogOpen,
    setIsRefineSearchDialogOpen,
    selectedFacilityRefineMajorType,
    onChangeSelectedFacilityRefineMajorType,
    selectedHomeCareRefineMiddleType,
    selectedMedicalCareRefineMiddleType,
    selectedFacilityCareRefineMiddleType,
    onChangeMiddleTypeCheckbox,
    disableRefineButton,
    onClickRefineFacilityButton,
    currentMiddleType,
    currentMajorType,
  };
};
