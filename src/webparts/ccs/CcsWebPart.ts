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
import { mockArray } from './mockData/FormData';

export interface ICcsWebPartProps {
  description: string;
  context: any;
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
    // Check if the app is running on local or online environment
    if (!this._isSharePoint) {
      console.log("LOCAL");
      this.checkConditionPassToRender(mockArray);
    } else {
      //TEDS TO BE WORKED ON
      // If online then grab the list and .THEN once that is done render the component to the DOM.
      console.log("ONLINE");
      this._getListItems().then(response => {      
        this.checkConditionPassToRender(response);
      });
    }
  }

  // Function to run inside the render methods IF statement so that I can pass the correct array depending on the environment
  // Pass the ProcurementNavigator PROP elements and envoke the ReactDom.render method inside the asyncronous call
  private checkConditionPassToRender(arrayPassed:any[]) {
    const element: React.ReactElement<ICcsProps> = React.createElement(
      Ccs,
      {
        description: this.properties.description,
        context: this.context,
        arrayToUse: arrayPassed
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  multiline: true,
                  resizable: true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
