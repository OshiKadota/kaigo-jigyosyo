import {
  SelectedFacilityCareMiddleTypes,
  SelectedMedicalCareMiddleTypes,
} from "@/components/FacilityRefineSearchForm/FacilityRefineSearchForm.type";
import {
  Facility,
  FacilityMajorType,
  FacilityMiddleType,
} from "@/types/facility.types";
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";

export class FacilitiesRepository {
  db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
  }

  public async fetchAll(): Promise<Facility[]> {
    const colRef = collection(this.db, "Facilities");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => {
      return {
        documentId: doc.id,
        designatedNumber: doc.data().designatedNumber,
        serviceMajorType: doc.data().serviceMajorType,
        serviceMiddleType: doc.data().serviceMiddleType,
        officeName: doc.data().officeName,
        postCode: doc.data().postCode,
        prefCode: doc.data().prefCode,
        cityCode: doc.data().cityCode,
        officeAddress: doc.data().officeAddress,
        officeTelNumber: doc.data().officeTelNumber,
        officeFaxNumber: doc.data().officeFaxNumber,
        designatedDate: doc.data().designatedDate,
        ManagementCorporationNumber: doc.data().ManagementCorporationNumber,
        latLang: doc.data().latLang,
        operationStatus: doc.data().operationStatus,
        remark: doc.data().remark,
        url: doc.data().url,
      };
    });
  }

  public async fetchByQuery(
    majorType: FacilityMiddleType[]
  ): Promise<Facility[]> {
    const colRef = collection(this.db, "Facilities");
    const q = query(colRef, where("serviceMiddleType", "in", majorType));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      return {
        documentId: doc.id,
        designatedNumber: doc.data().designatedNumber,
        serviceMajorType: doc.data().serviceMajorType,
        serviceMiddleType: doc.data().serviceMiddleType,
        officeName: doc.data().officeName,
        postCode: doc.data().postCode,
        prefCode: doc.data().prefCode,
        cityCode: doc.data().cityCode,
        officeAddress: doc.data().officeAddress,
        officeTelNumber: doc.data().officeTelNumber,
        officeFaxNumber: doc.data().officeFaxNumber,
        designatedDate: doc.data().designatedDate,
        ManagementCorporationNumber: doc.data().ManagementCorporationNumber,
        latLang: doc.data().latLang,
        operationStatus: doc.data().operationStatus,
        remark: doc.data().remark,
        url: doc.data().url,
      };
    });
  }

  public async fetchByMejorQuery(
    majorType: FacilityMajorType,
    middleType:
      | FacilityMiddleType[]
      | SelectedMedicalCareMiddleTypes[]
      | SelectedFacilityCareMiddleTypes[]
  ): Promise<Facility[]> {
    console.log("middleType", middleType);
    const colRef = collection(this.db, "Facilities");
    const q = query(
      colRef,
      where("serviceMajorType", "==", majorType),
      where("serviceMiddleType", "in", middleType)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      return {
        documentId: doc.id,
        designatedNumber: doc.data().designatedNumber,
        serviceMajorType: doc.data().serviceMajorType,
        serviceMiddleType: doc.data().serviceMiddleType,
        officeName: doc.data().officeName,
        postCode: doc.data().postCode,
        prefCode: doc.data().prefCode,
        cityCode: doc.data().cityCode,
        officeAddress: doc.data().officeAddress,
        officeTelNumber: doc.data().officeTelNumber,
        officeFaxNumber: doc.data().officeFaxNumber,
        designatedDate: doc.data().designatedDate,
        ManagementCorporationNumber: doc.data().ManagementCorporationNumber,
        latLang: doc.data().latLang,
        operationStatus: doc.data().operationStatus,
        remark: doc.data().remark,
        url: doc.data().url,
      };
    });
  }

  public async addDocs(facilities: Facility[]) {
    const batch = writeBatch(this.db);
    facilities.map((faci) => {
      const colRef = collection(this.db, "Facilities");
      const docRef = doc(colRef);
      batch.set(docRef, faci);
    });
    await batch.commit();
  }

  public async setDocById(facility: Facility): Promise<void> {
    const docRef = doc(this.db, "Facilities", facility.documentId);
    const updateDoc = {
      designatedNumber: facility.designatedNumber,
      serviceMajorType: facility.serviceMajorType,
      serviceMiddleType: facility.serviceMiddleType,
      officeName: facility.officeName,
      postCode: facility.postCode,
      officeAddress: facility.officeAddress,
      officeTelNumber: facility.officeTelNumber,
      officeFaxNumber: facility.officeFaxNumber,
      designatedDate: facility.designatedDate,
      ManagementCorporationNumber: facility.ManagementCorporationNumber,
      latLang: facility.latLang,
      operationStatus: facility.operationStatus,
      remark: facility.remark,
      url: facility.url ?? "",
    };
    await setDoc(docRef, updateDoc);
  }

  public async deleteDocById(documentId: string): Promise<void> {
    await deleteDoc(doc(this.db, "Facilities", documentId));
  }
}
