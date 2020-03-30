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

  // regionsData: this._isSharePoint ? this._getListItems().then(response => {return response}) : regionsData,
  
  public render(): void {
    const element: React.ReactElement<ICcsProps> = React.createElement(
      Ccs,
      {
        // regionsOnline: this._getListItems().then(response => {return response}),
        context: this.context,
        userData: this.context.pageContext.user,
        headings: this.properties,
        regionsData: regionsData,
        callSubjectData: callSubjectData
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
                PropertyPaneTextField('heading_moreStaffBool', {
                  label: strings.MoreStaffRequiredLabel
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
