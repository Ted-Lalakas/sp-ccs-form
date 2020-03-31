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
import { ICcsProps } from './components/ICcsProps';
import { ccsRegions } from './mockData/ccsRegions';
import { ccsCallSubject } from './mockData/ccsCallSubject';
import { ccsOrderType } from './mockData/ccsOrderType';

// import { sp } from "@pnp/sp/presets/all";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface ICcsWebPartProps {
}

export default class CcsWebPart extends BaseClientSideWebPart <ICcsWebPartProps> {
  private get _isSharePoint(): boolean {
    return (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint);
  }
  
  public async render() {
    let regions:any = null;
    let subjects:any = null;
    let orders:any = null;

    if (!this._isSharePoint) {
      console.log("LOCAL");
      regions = ccsRegions;
      subjects = ccsCallSubject;
      orders = ccsOrderType;
    } else {
      console.log("ONLINE");
      regions = await sp.web.lists.getByTitle("ccsRegions").items.select("Title","subRegion").getAll();
      subjects = await sp.web.lists.getByTitle("ccsCallSubject").items.select("Title","subject").getAll();
      orders = await sp.web.lists.getByTitle("ccsOrderType").items.select("Title").getAll();
    }      

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
