declare interface ICcsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  Title1FieldLabel: string;
}

declare module 'CcsWebPartStrings' {
  const strings: ICcsWebPartStrings;
  export = strings;
}
