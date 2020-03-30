declare interface ICcsWebPartStrings {
  PropertyPaneDescription: string;
  FormElements: string;
  ReviewForm: string;
  GroupHeadingInfo: string;
  GroupReviewForm: string;
  GroupFormFields: string;
  GroupFormFields2: string;
  TitleFieldLabel: string;
  DescriptionFieldLabel: string;
  DutyDirectorLabel: string;
  JaidFieldLabel: string;
  RegionalOfficeLocation: string;
  SubRegion: string;
  DateFieldLabel: string;
  TimeofCallLabel: string;
  OrderTypeLabel: string;
  CallSubjectLabel: string;
  CallOptionLabel: string;
  CommentLabel: string;
  VisitRequiredLabel: string;
  ResolvedTimeLabel: string;
  MoreStaffRequiredLabel: string;
  ExtraStaffLabel: string;
  StaffTimeLabel: string;
}

declare module 'CcsWebPartStrings' {
  const strings: ICcsWebPartStrings;
  export = strings;
}
