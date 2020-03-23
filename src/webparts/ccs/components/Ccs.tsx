import * as React from 'react';
import styles from './Ccs.module.scss';
import { ICcsProps, ICcsState } from './ICcsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Stack } from 'office-ui-fabric-react';
import InputFieldName from './formComponents/InputFieldName';
import InputFieldJAID from './formComponents/InputFieldJAID';
import InputFieldNotes from './formComponents/InputFieldNotes';
import RegionDropDown from './formComponents/RegionSelection/RegionDropDown';
import SubRegionDropDown from './formComponents/RegionSelection/SubRegionDropDown';
import { getRegionArrayData, getSubRegionArrayData } from './formComponents/RegionSelection/arrayFunctions';

import { DatePicker, mergeStyleSets } from 'office-ui-fabric-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DefaultButton } from 'office-ui-fabric-react';

export default class Ccs extends React.Component<ICcsProps, ICcsState> {
  constructor(props:any) {
    super(props);

    console.log("-------------------------------------------------------------------------");
    console.log("[ProcurementNavigator.tsx] CONSTRUCTOR",this.props);
    console.log("-------------------------------------------------------------------------");

    // State handles variable changes and will be used by submit to store the data
    this.state = {
      regionsArray: getRegionArrayData(this.props.arrayToUse),
      subRegionArray: getSubRegionArrayData(this.props.arrayToUse),
      offenderJAID: "",
      dateValue: "",
      dateValue2: null,
      regionValue: "",
      subRegionValue: "",
      offenderNotes: "",
      toggleValue: false
    };
  }

  // Grab the Users (that is logged in) name and email data
  private userName:string = JSON.stringify(this.props.context.pageContext.user._displayName).replace(/"/g, '');
  private userEmail:string = JSON.stringify(this.props.context.pageContext.user._email).replace(/"/g, '');
  
  // For testing purposes. Can be removed.
  public componentDidMount() {
    console.log("-------------------------------------------------------------------------");
    console.log('[Ccs.tsx] componentDidMount',this.props);
    console.log("-------------------------------------------------------------------------");
  }

  // // For testing purposes. Can be removed.
  public componentDidUpdate() {
    console.log("-------------------------------------------------------------------------");
    console.log('[Ccs.tsx] componentDidUpdate',this.state);
    console.log("-------------------------------------------------------------------------");
  }

  public offenderJAIDHandler = (value:string) => {
    this.setState({ offenderJAID: value });
  }

  public offenderNotesHandler = (value:string) => {
    this.setState({ offenderNotes: value });
  }

  private _onFormatDate = (date: Date): string => {
    // const dateTest = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    const dateTest = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
    this.setState({ dateValue: dateTest });
    this.setState({ dateValue2: date });
    return dateTest;
  }

  public changeRegionHandler = (value) => {
    this.setState({ regionValue: value });
    this.setState({ subRegionValue: "" });
  }

  public changeDropDownHandler = (value) => {
    this.setState({ subRegionValue: value });
  }

  // public toggleChangeHandler = () => {
  //   this.setState({ toggleValue: !this.state.toggleValue });
  // }

  // public fieldFilled = ():boolean => {
  //   const valueReturned = !this.state.offenderName    ||
  //     !this.state.offenderJAID    ||
  //     !this.state.regionValue     || 
  //     !this.state.subRegionValue  || 
  //     !this.state.dateValue ? true : false;
  //   return valueReturned;
  // }

  // public colorSetSubmit = (): any => {
  //   const valueStyle = this.fieldFilled() ? styles.submitButtonOff : styles.submitButtonOn;
  //   return valueStyle;
  // }

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

              <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }>

                <InputFieldJAID 
                  heading={this.props.heading_jaid}
                  jaid={this.state.offenderJAID} 
                  changeHandler={this.offenderJAIDHandler} 
                />

                <DatePicker 
                  ariaLabel={this.props.heading_dateField} 
                  label={this.props.heading_dateField}
                  placeholder={this.props.placeholder_dateField}
                  onSelectDate={this._onFormatDate}
                  value={this.state.dateValue2!}
                  allowTextInput={false}
                  isRequired={true}
                />

                <RegionDropDown 
                  heading={this.props.heading_regionalLocation}
                  placeholderText={this.props.placeholder_regionalLocation}
                  disabledValue={false} 
                  changeHandler={this.changeRegionHandler}
                  regionsArray={this.state.regionsArray} 
                />

                <SubRegionDropDown
                  heading={this.props.heading_subRegion} 
                  placeholderText={this.props.placeholder_subRegion}
                  disabledValue={!this.state.regionValue ? true : false} 
                  changeHandler={this.changeDropDownHandler} 
                  regionsArray={this.state.subRegionArray} 
                  regionValue={this.state.regionValue}
                />

                {/* <InputFieldNotes changeHandler={this.offenderNotesHandler} /> */}


                {/* <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                      <DefaultButton 
                        className={ this.colorSetSubmit() }
                        text="Submit Data" 
                        onClick={() => alert("Its clicked!")} 
                        disabled={this.fieldFilled()} 
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                      <Toggle 
                        className={ styles.reviewToggle }
                        label="Review Form Data" 
                        checked={this.state.toggleValue}
                        onText="Show" 
                        offText="Hide" 
                        onChange={this.toggleChangeHandler} 
                    />
                    </div>
                  </div>
                </div> */}

              </Stack>

            
            { this.state.toggleValue ? //displays form data (if needed) extra feature just for fun
            <div className={ styles.formDisplayData }>              
              <h3>{this.props.heading_dutyDirector}: {this.userName}</h3>

              { this.state.offenderJAID ? 
                <div className={ styles.formDataWrap }>
                  <label>Offender JAID</label>
                  <p>{this.state.offenderJAID}</p>
                </div>
              : null }

              { this.state.dateValue ?
                <div className={ styles.formDataWrap }>
                  <label>Date of incident</label>
                  <p>{this.state.dateValue}</p>
                </div>
              : null }

              { this.state.regionValue ? 
                <div className={ styles.formDataWrap }>
                  <label>Region</label>
                  <p>{this.state.regionValue}</p>
                </div>
              : null }

              { this.state.subRegionValue ? 
                <div className={ styles.formDataWrap }>
                  <label>Sub Region</label>
                  <p>{this.state.subRegionValue}</p>
                </div>
              : null }

              { this.state.offenderNotes ? 
                <div className={ styles.formDataWrap }> 
                  <label>Notes</label>
                  <p>{this.state.offenderNotes}</p>
                </div>
              : null }
            </div>  
            : null } 

            </div>
          </div>
        </div>

      </div> // wrapping container
    );
  }
}
