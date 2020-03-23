export interface ICcsProps {
	description: string;
	context:any;
	arrayToUse:any;
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
  heading_callSubject: string;
  heading_issueActivity: string;
  heading_comment: string;
  heading_visitRequired: string;
  heading_resolveTime: string;
  heading_extraStaff: string;
  heading_staffTime: string;
}

export interface ICcsState {
  regionsArray: {};
  subRegionArray: {};
  offenderJAID: string;
  dateValue: string;
  dateValue2: Date;
  regionValue: string;
  subRegionValue: string;
  offenderNotes: string;
  toggleValue: boolean;
}