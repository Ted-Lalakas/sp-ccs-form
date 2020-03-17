import * as React from 'react';
import styles from './Ccs.module.scss';
import { ICcsProps } from './ICcsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { DefaultButton, Stack, arraysEqual } from 'office-ui-fabric-react';
import InputField from './TextField/InputField';
import DropdownMain from './DropDown/DropDown';
import { getRegionArrayData } from './CcsArrayFunc';

export default class Ccs extends React.Component<any, any, any> {
  constructor(props:any) {
    super(props);

    console.log("-------------------------------------------------------------------------");
    console.log("[ProcurementNavigator.tsx] CONSTRUCTOR",this.props);
    console.log("-------------------------------------------------------------------------");


    const teds = getRegionArrayData(this.props.arrayToUse);
    console.log(teds);


    // Pass a new Object to state and spread the first question
    this.state = {
      inputValue1: "",
      regionValue: "",
      dropDownValue1: ""
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

  public changeNestedInputHander = (value) => {
    // console.log(newValue);
    this.setState({ inputValue1: value });
  }

  public changeRegionHander = (value) => {
    // console.log(value);
    this.setState({ regionValue: value });
  }

  public changeDropDownHander = (value) => {
    // console.log(value);
    this.setState({ dropDownValue1: value });
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
                <InputField changeHandler={this.changeNestedInputHander} />
                {/* <h3>{this.state.inputValue2}</h3> */}
              </Stack>

              <DropdownMain 
                placeholderText="Region Details"
                disabledValue={false} 
                changeHandler={this.changeRegionHander} 
              />

              <DropdownMain 
                placeholderText="Sub Region"
                disabledValue={!this.state.regionValue ? true : false} 
                changeHandler={this.changeDropDownHander} 
              />

              {/* <DropdownMain 
                placeholderText="Sub Region"
                disabledValue={!this.state.regionValue ? true : false} 
                changeHandler={this.changeDropDownHander} 
              /> */}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
