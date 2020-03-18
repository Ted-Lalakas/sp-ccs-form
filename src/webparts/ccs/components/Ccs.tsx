import * as React from 'react';
import styles from './Ccs.module.scss';
import { ICcsProps } from './ICcsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Stack } from 'office-ui-fabric-react';
import InputFieldName from './TextField/InputFieldName';
import InputFieldJAID from './TextField/InputFieldJAID';
import DropdownMain from './DropDown/DropDown';
import DropdownSub from './DropDown/DropDownSub';
import { getRegionArrayData, getSubRegionArrayData } from './CcsArrayFunc';

import { DatePicker, mergeStyleSets } from 'office-ui-fabric-react';

export default class Ccs extends React.Component<any, any, any> {
  constructor(props:any) {
    super(props);

    console.log("-------------------------------------------------------------------------");
    console.log("[ProcurementNavigator.tsx] CONSTRUCTOR",this.props);
    console.log("-------------------------------------------------------------------------");

    // State handles variable changes and will be used by submit to store the data
    this.state = {
      regionsArray: getRegionArrayData(this.props.arrayToUse),
      subRegionArray: getSubRegionArrayData(this.props.arrayToUse),
      offenderName: "",
      offenderJAID: "",
      regionValue: "",
      subRegionValue: ""
    };
  }

  // For testing purposes. Can be removed.
  public componentDidMount() {
    console.log("-------------------------------------------------------------------------");
    console.log('[ProcurementNavigator.tsx] componentDidMount',this.state);
    console.log("-------------------------------------------------------------------------");
  }

  // For testing purposes. Can be removed.
  public componentDidUpdate() {
    console.log("-------------------------------------------------------------------------");
    console.log('[ProcurementNavigator.tsx] componentDidUpdate',this.state);
    console.log("-------------------------------------------------------------------------");
  }

  public offenderNameHander = (value) => {
    this.setState({ offenderName: value });
  }

  public offenderJAIDHander = (value) => {
    this.setState({ offenderJAID: value });
  }

  public checkDateHandler = (value) => {
    this.setState({ offenderName: value });
  }

  public changeRegionHander = (value) => {
    this.setState({ regionValue: value });
    this.setState({ subRegionValue: "" });
  }

  public changeDropDownHander = (value) => {
    this.setState({ subRegionValue: value });
  }



  public render(): React.ReactElement<ICcsProps> {
    return (
      <div className={ styles.ccs }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>CCS After Hours Activity Form</span>
              <p className={ styles.description }>{escape(this.props.description)}</p>
            </div>
          </div>
        </div>

        <div className={ styles.container }>
          <div className={ styles.row2 }>
            <div className={ styles.column }>

              <Stack tokens={{ childrenGap: 15 }}>
                <InputFieldName changeHandler={this.offenderNameHander} />

                <InputFieldJAID changeHandler={this.offenderJAIDHander} />

                <DatePicker 
                  ariaLabel="Date of incident" 
                  label="Date of incident"
                  onSelectDate={this.checkDateHandler}
                />

              <DropdownMain 
                placeholderText="Region Details"
                disabledValue={false} 
                changeHandler={this.changeRegionHander}
                regionsArray={this.state.regionsArray} 
              />

              <DropdownSub 
                placeholderText="Sub Region"
                disabledValue={!this.state.regionValue ? true : false} 
                changeHandler={this.changeDropDownHander} 
                regionsArray={this.state.subRegionArray} 
                regionValue={this.state.regionValue}
              />
            </Stack>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
