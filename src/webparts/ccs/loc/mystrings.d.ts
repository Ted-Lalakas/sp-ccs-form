declare interface ICcsWebPartStrings {
  PropertyPaneDescription: string;
  FormElements: string;
  ReviewForm: string;
  GroupHeadingInfo: string;
  GroupReviewForm: string;
  GroupFormFields: string;
  GroupFormFields2: string;
  GroupSubmitSuccess: string;
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
  ReviewFormToggle: string;
  SubmitButton1: string;
  SubmitButton1Extra: string;
  SubmitButton2: string;
}

declare module 'CcsWebPartStrings' {
  const strings: ICcsWebPartStrings;
  export = strings;
}
