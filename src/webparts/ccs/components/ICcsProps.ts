export interface ICcsProps {
  regionsOnline: any;
  context: any;
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
  optionOtherValue: string;
  resolveTime: string;
  extraStaff: string;
  staffTime: string;
}