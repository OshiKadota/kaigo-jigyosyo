import { Facility } from "@/types/facility.types";
import { useEffect, useState } from "react";
import { FacilitiesRepository } from "@/repository/FacilitiesRepository";
import { db } from "@/lib/firebase";
import { initialFacilityInfo } from "@/constants/facility.constants";
export const useViewList = () => {
  const facilitiesRepository = new FacilitiesRepository(db);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacilityInfo, setSelectedFacilityInfo] =
    useState<Facility>(initialFacilityInfo);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const fetchAllFaclity = async () => {
    const faci = await facilitiesRepository.fetchAll();
    setFacilities(faci);
  };

  const onClickFacilityDelete = async (documentId: string) => {
    try {
      await facilitiesRepository.deleteDocById(documentId);
      await fetchAllFaclity();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const onClickFacilityUpdate = async (facility: Facility) => {
    try {
      await facilitiesRepository.setDocById(facility);
      await fetchAllFaclity();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const onClickDisplayFacilityInfo = (index: number) => {
    setSelectedFacilityInfo(facilities[index]);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchAllFaclity();
  }, []);

  return {
    facilities,
    isDialogOpen,
    setIsDialogOpen,
    onClickDisplayFacilityInfo,
    selectedFacilityInfo,
    onClickFacilityDelete,
    onClickFacilityUpdate,
  };
};
