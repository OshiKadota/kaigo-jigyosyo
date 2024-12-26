import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { FacilitiesRepository } from "@/repository/FacilitiesRepository";
import { initialSelectedMapFacility } from "@/constants/facility.constants";
import {
  Facility,
  FacilityMiddleType,
  SelectedMapFacility,
} from "@/types/facility.types";
import { useQueryParams } from "@/hooks/useQueryParams";
export const useMapPage = () => {
  const {
    searchParams,
    getSelectedMiddleTypeByQueryParams,
    setQueryParamsBySelectedMiddleType,
  } = useQueryParams();
  const facilitiesRepository = new FacilitiesRepository(db);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedMapFacility, setSelectedMapFacility] = useState<
    SelectedMapFacility[]
  >(initialSelectedMapFacility);
  const [isLoadingPage, setIsloadingPage] = useState<boolean>(false);

  const selectedMapFacilityKeys: FacilityMiddleType[] = useMemo(() => {
    return selectedMapFacility.flatMap((faci) =>
      faci.isSelected ? [faci.key] : []
    );
  }, [selectedMapFacility]);

  const disableSelectedMapFacility: boolean = useMemo(() => {
    return isLoadingPage;
  }, [isLoadingPage]);

  const disableSwitchFacilityButton: boolean = useMemo(() => {
    if (selectedMapFacilityKeys.length === 0 || isLoadingPage) {
      return true;
    }
    return false;
  }, [selectedMapFacilityKeys, isLoadingPage]);

  const onChangeSelectedMapFacility = (
    changedKey: FacilityMiddleType,
    currentValue: SelectedMapFacility[]
  ) => {
    const newValue = currentValue.map((value) => {
      if (value.key === changedKey) {
        value.isSelected = !value.isSelected;
        return value;
      }
      return value;
    });
    setSelectedMapFacility(newValue);
  };
  const clickSwitchFacilityButton = () => {
    setFacilities([]);
    setSelectedMapFacilityByMajorTypeQueryParams(selectedMapFacilityKeys);
    setQueryParamsBySelectedMiddleType(selectedMapFacilityKeys);
    fetchFacilitiesByQuery(selectedMapFacilityKeys);
  };
  const fetchFacilitiesByQuery = async (
    selectedMiddleType: FacilityMiddleType[]
  ) => {
    const faci = await facilitiesRepository.fetchByQuery(selectedMiddleType);
    setFacilities(faci);
  };
  const setSelectedMapFacilityByMajorTypeQueryParams = (
    selectedFacilities: FacilityMiddleType[]
  ) => {
    const newSelectedMapFaciliy = selectedMapFacility.map((faci) => {
      if (selectedFacilities.includes(faci.key)) {
        faci.isSelected = true;
        return faci;
      }
      faci.isSelected = false;
      return faci;
    });
    setSelectedMapFacility(newSelectedMapFaciliy);
  };
  useEffect(() => {
    try {
      setIsloadingPage(true);
      const selectedMajorType =
        getSelectedMiddleTypeByQueryParams(searchParams);
      setSelectedMapFacilityByMajorTypeQueryParams(selectedMajorType);
      fetchFacilitiesByQuery(selectedMajorType);
    } catch (e) {
      console.error(e);
    } finally {
      setIsloadingPage(false);
    }
  }, []);

  return {
    facilities,
    onChangeSelectedMapFacility,
    clickSwitchFacilityButton,
    selectedMapFacility,
    disableSwitchFacilityButton,
    disableSelectedMapFacility,
  };
};
