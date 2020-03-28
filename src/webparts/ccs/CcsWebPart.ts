import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'CcsWebPartStrings';
import Ccs from './components/Ccs';

import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ICcsProps } from './components/ICcsProps';
import { regionsData } from './mockData/regionsData';
import { callSubjectData } from './mockData/callSubjectData';

export interface ICcsWebPartProps {
  titleValue: string;
  description: string;
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
}

export default class CcsWebPart extends BaseClientSideWebPart <ICcsWebPartProps> {

  private get _isSharePoint(): boolean {
    return (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint);
  }

  private _getListItems(): Promise<any[]> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('CCS After Hours Form Data')/items?$select=Title,Option_x0020_Value,Type_x0020_of_x0020_Data", SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.value;
      }) as Promise<any[]>;
  }

  public render(): void {
    const element: React.ReactElement<ICcsProps> = React.createElement(
      Ccs,
      {
        context: this.context,
        titleValue: this.properties.titleValue,
        description: this.properties.description,
        userData: this.context.pageContext.user,
        regionsData: this._isSharePoint ? this._getListItems().then(response => {return response}) : regionsData,
        callSubjectData: callSubjectData,
        headings: {
          heading_dutyDirector: this.properties.heading_dutyDirector,
          heading_jaid: this.properties.heading_jaid,
          heading_regionalLocation: this.properties.heading_regionalLocation,
          placeholder_regionalLocation: this.properties.placeholder_regionalLocation,
          heading_subRegion: this.properties.heading_subRegion,
          placeholder_subRegion: this.properties.placeholder_subRegion,
          heading_dateField: this.properties.heading_dateField,
          placeholder_dateField: this.properties.placeholder_dateField,
          heading_timeofCall: this.properties.heading_timeofCall,
          heading_orderType: this.properties.heading_orderType,
          placeholder_orderType: this.properties.placeholder_orderType,
          heading_subject: this.properties.heading_subject,
          placeholder_subject: this.properties.placeholder_subject,
          heading_option: this.properties.heading_option,
          placeholder_option: this.properties.placeholder_option,
          heading_comment: this.properties.heading_comment,
          heading_visitRequired: this.properties.heading_visitRequired,
          heading_resolveTime: this.properties.heading_resolveTime,
          heading_extraStaff: this.properties.heading_extraStaff,
          heading_staffTime: this.properties.heading_staffTime
        }
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.GroupHeadingInfo,
              groupFields: [
                PropertyPaneTextField('titleValue', {
                  label: strings.TitleFieldLabel,
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  multiline: true,
                  resizable: true
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.FormElements
          },
          groups: [
            {
              groupName: strings.GroupFormFields,
              groupFields: [
                PropertyPaneTextField('heading_jaid', {
                  label: strings.JaidFieldLabel
                }),
                PropertyPaneTextField('heading_dateField', {
                  label: strings.DateFieldLabel
                }),
                PropertyPaneTextField('placeholder_dateField', {}),                
                PropertyPaneTextField('heading_timeofCall', {
                  label: strings.TimeofCallLabel
                }),
                PropertyPaneTextField('heading_regionalLocation', {
                  label: strings.RegionalOfficeLocation
                }),
                PropertyPaneTextField('placeholder_regionalLocation', {}),
                PropertyPaneTextField('heading_subRegion', {
                  label: strings.SubRegion
                }),
                PropertyPaneTextField('placeholder_subRegion', {}),
                PropertyPaneTextField('heading_orderType', {
                  label: strings.OrderTypeLabel
                }),
                PropertyPaneTextField('placeholder_orderType', {})
              ]
            }
          ]
        },
        {
          header: {
            description: strings.FormElements
          },
          groups: [
            {
              groupName: strings.GroupFormFields,
              groupFields: [
                PropertyPaneTextField('heading_subject', {
                  label: strings.CallSubjectLabel
                }),
                PropertyPaneTextField('placeholder_subject', {}),
                PropertyPaneTextField('heading_option', {
                  label: strings.CallOptionLabel
                }),
                PropertyPaneTextField('placeholder_option', {}),
                PropertyPaneTextField('heading_comment', {
                  label: strings.CommentLabel
                }),
                PropertyPaneTextField('heading_visitRequired', {
                  label: strings.VisitRequiredLabel
                }),
                PropertyPaneTextField('heading_resolveTime', {
                  label: strings.ResolvedTimeLabel
                }),
                PropertyPaneTextField('heading_extraStaff', {
                  label: strings.ExtraStaffLabel
                }),
                PropertyPaneTextField('heading_staffTime', {
                  label: strings.StaffTimeLabel
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.ReviewForm
          },
          groups: [
            {
              groupName: strings.GroupReviewForm,
              groupFields: [
                PropertyPaneTextField('heading_dutyDirector', {
                  label: strings.DutyDirectorLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
