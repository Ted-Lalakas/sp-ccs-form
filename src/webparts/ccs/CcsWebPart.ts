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
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { ICcsProps } from './components/ICcsProps';
import { ccsRegions } from './mockData/ccsRegions';
import { ccsCallSubject } from './mockData/ccsCallSubject';
import { ccsOrderType } from './mockData/ccsOrderType';

export interface ICcsWebPartProps {
}

export default class CcsWebPart extends BaseClientSideWebPart <ICcsWebPartProps> {
  public test: any;

  private get _isSharePoint(): boolean {
    return (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint);
  }

  private _getListItems(listTitle:string, filter:string): Promise<any[]> {
    return this.context.spHttpClient.get(
        this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getByTitle('${listTitle}')/items?$select=${filter}`, 
        SPHttpClient.configurations.v1,
          { 
            headers: { 'ACCEPT': 'application/json; odata.metadata=none' } 
          }
        )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse.value;
      }) as Promise<any[]>;
  }
  
  public render() {
    if (!this._isSharePoint) {
      console.log("LOCAL");
      this.run(ccsRegions,ccsCallSubject,ccsOrderType);
    } else {
      console.log("ONLINE");
      this.run(this._getListItems("ccsRegions","Title,subRegion"),this._getListItems("ccsCallSubject","Title,subject"),this._getListItems("ccsOrderType","Title"));
    }
  }

  private async run(regionsData:any, subjectsData:any, ordersData:any) {
      const regions = await regionsData;
      const subjects = await subjectsData;
      const orders = await ordersData;

      // Regions: Grab all titles and set an array of unique items
      const regionTitleAll = [...regions.map(x => x.Title)];
	    const regionUnique = regionTitleAll.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

      // Subjects: Grab all titles and set an array of unique items
      const subjectTitleAll = [...subjects.map(x => x.Title)];
      const subjectUnique = subjectTitleAll.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

      const orderUnique = [...orders.map(x => x.Title)];

      const element: React.ReactElement<ICcsProps> = React.createElement(
        Ccs,
        {
          regionsAll: regions,
          regionsUnique: regionUnique,
          subjectsAll: subjects,
          subjectsUnique: subjectUnique,
          ordersAll: orderUnique,
          context: this.context,
          userData: this.context.pageContext.user,
          headings: this.properties
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
