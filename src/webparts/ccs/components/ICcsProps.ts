export interface ICcsProps {
  titleValue: string;
	description: string;
  userData:any;
  regionsData:any[];
  callSubjectData:any[];
  headings: {
    heading_dutyDirector: string;
    heading_jaid: string;
    heading_regionalLocation: string;
    placeholder_regionalLocation: string;
    heading_subRegion: string;
    placeholder_subRegion: string;
    heading_dateField: string;
    placeholder_dateField: string;
    heading_timeofCall: string;
    heading_orderType: string;
    placeholder_orderType: string;
    heading_subject: string;
    placeholder_subject: string;
    heading_option: string;
    placeholder_option: string;
    heading_comment: string;
    heading_visitRequired: string;
    heading_resolveTime: string;
    heading_extraStaff: string;
    heading_staffTime: string;
  };
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