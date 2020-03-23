declare interface ICcsWebPartStrings {
  PropertyPaneDescription: string;
  GroupHeadingInfo: string;
  GroupFormFields: string;
  DescriptionFieldLabel: string;
  DutyDirectorLabel: string;
  JaidFieldLabel: string;
  RegionalOfficeLocation: string;
  SubRegion: string;
  DateFieldLabel: string;
  TimeofCallLabel: string;
  OrderTypeLabel: string;
  CallSubjectLabel: string;
  IssueActivityLabel: string;
  CommentLabel: string;
  VisitRequiredLabel: string;
  ResolvedTimeLabel: string;
  ExtraStaffLabel: string;
  StaffTimeLabel: string;
}

declare module 'CcsWebPartStrings' {
  const strings: ICcsWebPartStrings;
  export = strings;
}
