import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface ICcsProps {
  regionsAll: any;
  regionsUnique: any;
  subjectsAll: any;
  subjectsUnique: any;
  ordersAll: any;
  context: WebPartContext;
  userData:any;
  headings: any;
  regionsData:any[];
  callSubjectData:any[];
}

export interface ICcsState {
  offenderJAID: string;
  dateValue: string;
  dateValue2: Date;
  timeValue: string;
  regionValue: string;
  subRegionValue: string;
  orderType: string;
  offenderNotes: string;
  visitRequired: string;
  toggleValue: boolean;
  subjectValue: string;
  optionValue: string;
  staffRequired: string;
  resolveTime: string;
  extraStaff: string;
  staffTime: string;
}