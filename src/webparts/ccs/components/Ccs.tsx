import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import styles from './Ccs.module.scss';
import { ICcsProps, ICcsState } from './ICcsProps';

import { Stack, DatePicker } from 'office-ui-fabric-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { CompoundButton } from 'office-ui-fabric-react';

// Custom components
import InputFieldJAID from './formComponents/InputFieldJAID';
import TimeComponent from './formComponents/TimeComponent';
import RegionDropDown from './formComponents/RegionSelection/RegionDropDown';
import SubRegionDropDown from './formComponents/RegionSelection/SubRegionDropDown';
import OrderType from './formComponents/OrderType';
import VisitRequired from './formComponents/VisitRequired';
import SubjectDropDown from './formComponents/IssuesInformation/SubjectDropDown';
import OptionDropDown from './formComponents/IssuesInformation/OptionDropDown';
import InputFieldNotes from './formComponents/InputFieldNotes';
import StaffRequired from './formComponents/StaffRequired';
import ExtraStaff from './formComponents/ExtraStaff';
import StaffTime from './formComponents/StaffTime';
import ReviewData from './formComponents/ReviewData';

export default class Ccs extends React.Component<ICcsProps, ICcsState> {
  constructor(props:any) {
    super(props);

    console.log("-------------------------------------------------------------------------");
    console.log("[ProcurementNavigator.tsx] CONSTRUCTOR",this.props);
    console.log("-------------------------------------------------------------------------");

    // State handles variable changes and will be used by submit to store the data
    this.state = {
      offenderJAID: "",
      dateValue: "",
      dateValue2: null,
      timeValue: null,
      regionValue: "",
      subRegionValue: "",
      orderType: "",
      subjectValue: "",
      optionValue: "",
      offenderNotes: "",
      visitRequired: "No",
      resolveTime: "",
      staffRequired: "No",
      extraStaff: "",
      staffTime: "",
      toggleValue: false
    };
  }
  // For testing purposes. Can be removed.
  // public componentDidMount() {
  //   console.log("-------------------------------------------------------------------------");
  //   console.log('[Ccs.tsx] componentDidMount',this.props);
  //   console.log("-------------------------------------------------------------------------");
  // }

  // For testing purposes. Can be removed.
  public componentDidUpdate() {
    console.log("-------------------------------------------------------------------------");
    console.log('[Ccs.tsx] componentDidUpdate - STATE',this.state);
    console.log("-------------------------------------------------------------------------");
  }

  // JAID
  public _offenderJAIDHandler = (value:string) => {
    this.setState({ offenderJAID: value });
  }

  // Date Field
  private _onFormatDate = (date: Date): string => {
    // const dateTest = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    const dateTest = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
    this.setState({ dateValue: dateTest });
    this.setState({ dateValue2: date });
    return dateTest;
  }

  // Time Field
  public _changeTimeHandler = (value:string) => {
    this.setState({ timeValue: value });
  }

  // Region Drop-down
  public _changeRegionHandler = (value:string) => {
    this.setState({ regionValue: value });
    this.setState({ subRegionValue: "" });
  }

  // Sub-Region Drop-Down
  public _changeSubRegionHandler = (value:string) => {
    this.setState({ subRegionValue: value });
  }

  // Order Type Drop-Down
  public _changeOrderTypeHandler = (value:string) => {
    this.setState({ orderType: value });
  }

  // Subject Drop-down
  public _changeSubjectHandler = (value:string) => {
    this.setState({ subjectValue: value });
    this.setState({ optionValue: "" });
  }
  
  // Option Drop-down
  public _changeOptionHandler = (value:string) => {
    this.setState({ optionValue: value });
  }

  // Notes
  public _offenderNotesHandler = (value:string) => {
    this.setState({ offenderNotes: value });
  }

  // Visit Boolean
  public _changeVisitHandler = (value:string) => {
    this.setState({ visitRequired: value });
  }

  // Resolve Time
  public _changeResolveTimeHandler = (value:string) => {
    this.setState({ resolveTime: value });
  }

  // Additional Staff Required boolean
  public _changeStaffHandler = (value:string) => {
    this.setState({ staffRequired: value });
    this.setState({ extraStaff: "" });
    this.setState({ staffTime: "" });  
  }

  // Extra Staff
  public _changeExtraStaffHandler = (value:string) => {
    this.setState({ extraStaff: value });
  }

  // Staff Time
  public _changeStaffTimeHandler = (value:string) => {
    this.setState({ staffTime: value });
  }

  // Review Data Toggle
  public _toggleChangeHandler = () => {
    this.setState({ toggleValue: !this.state.toggleValue });
  }

  // Check if Submit button should be enabled
  public SubmitOn = ():boolean => {                              
    const checkJAIDLegth = this.state.offenderJAID.length <= 9 && this.state.offenderJAID != "" ? true : false;

    let staffExtra:boolean =  false;
      if(this.state.staffRequired == "Yes") {
        staffExtra = this.state.extraStaff ? true : false;
      } else {
        staffExtra = true;
      }

    let staffTime:boolean =  false;    
    if(this.state.staffRequired == "Yes") {
      staffTime = this.state.staffTime ? true : false;
    } else {
      staffTime = true;
    }

    return this.state.offenderJAID    &&
            this.state.dateValue       &&
            this.state.timeValue       &&
            this.state.regionValue     && 
            this.state.subRegionValue  &&
            this.state.orderType       &&
            this.state.subjectValue    &&
            this.state.optionValue     &&
            this.state.resolveTime     &&
            staffExtra                 && 
            staffTime                  && 
            checkJAIDLegth ? false : true;
  }

  // Set the color styling for the submit button (just styling)
  public colorSetSubmit = ():any => {
    return this.SubmitOn() ? styles.submitButtonOff : styles.submitButtonOn;
  }

  public render(): React.ReactElement<ICcsProps> {
    return (
      <div className={ styles.ccs }>
        <div className={ styles.container }>
          <div className={ styles.row }>
{/* */} {/* <div className={ styles.column }> */}
              <span className={ styles.title }>{escape(this.props.headings.titleValue)}</span>
              <p className={ styles.description }>{escape(this.props.headings.description)}</p>
{/* */}{/* </div> */}
          </div>
        </div>

        <div className={ styles.container }>
          <div className={ styles.row2 }>
{/* */} {/* <div className={ styles.column }> */}

              <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }>
                <InputFieldJAID 
                  heading={this.props.headings.heading_jaid}
                  jaid={this.state.offenderJAID} 
                  changeHandler={this._offenderJAIDHandler} 
                />

                <DatePicker 
                  className={styles.datePicker}
                  ariaLabel={this.props.headings.heading_dateField} 
                  label={this.props.headings.heading_dateField}
                  placeholder={this.props.headings.placeholder_dateField}
                  onSelectDate={this._onFormatDate}
                  value={this.state.dateValue2!}
                  allowTextInput={false}
                  isRequired={true}
                />
              </Stack>

                <div style={{ marginTop: '1em' }} className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                    <TimeComponent 
                      timeValue={this.state.timeValue} 
                      changeHandler={this._changeTimeHandler} 
                      heading={this.props.headings.heading_timeofCall}
                      />
                  </div>
                  { this.state.timeValue ?
                  <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                    <h3 className={styles.timeFieldLabel}>Time set: {this.state.timeValue}</h3>
                  </div>
                  : null }
                </div>      

                <div style={{ marginTop: '3em', marginBottom: '2em' }}>  
                <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }> 
                  <RegionDropDown 
                    heading={this.props.headings.heading_regionalLocation}
                    placeholderText={this.props.headings.placeholder_regionalLocation}
                    changeHandler={this._changeRegionHandler}
                    regionsUnique={this.props.regionsUnique} 
                  />

                  <SubRegionDropDown
                    heading={this.props.headings.heading_subRegion} 
                    placeholderText={this.props.headings.placeholder_subRegion}
                    disabledValue={!this.state.regionValue ? true : false} 
                    changeHandler={this._changeSubRegionHandler} 
                    regionsArray={this.props.regionsAll} 
                    regionValue={this.state.regionValue}
                  />
                </Stack>
                </div>

                <OrderType 
                  heading={this.props.headings.heading_orderType} 
                  placeholderText={this.props.headings.placeholder_orderType} 
                  changeHandler={this._changeOrderTypeHandler}
                  orderArray={this.props.ordersAll} 
                  orderType={this.state.orderType}
                />

                <div style={{ marginTop: '2em', marginBottom: '2em' }}>  
                <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }>     
                  <SubjectDropDown
                    heading={this.props.headings.heading_subject}
                    placeholderText={this.props.headings.placeholder_subject}
                    changeHandler={this._changeSubjectHandler}
                    subjectArray={this.props.subjectsUnique}
                  />

                  <OptionDropDown
                    heading={this.props.headings.heading_option} 
                    placeholderText={this.props.headings.placeholder_option}
                    disabledValue={!this.state.subjectValue ? true : false} 
                    changeHandler={this._changeOptionHandler} 
                    callSubjectArray={this.props.subjectsAll} 
                    subjectValue={this.state.subjectValue}
                  />
                </Stack>
                </div>

                <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }>
                  <InputFieldNotes 
                    heading={this.props.headings.heading_comment}
                    changeHandler={this._offenderNotesHandler} 
                  />
                  
                  <VisitRequired
                    heading={this.props.headings.heading_visitRequired} 
                    visitValue={this.state.visitRequired} 
                    changeHandler={this._changeVisitHandler} 
                  />

                  <div style={{ marginTop: '1em' }} className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <TimeComponent 
                        timeValue={this.state.resolveTime}
                        changeHandler={this._changeResolveTimeHandler}
                        heading={this.props.headings.heading_resolveTime}
                        />
                    </div>
                    { this.state.resolveTime ?
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <h3 className={styles.timeFieldLabel}>Time set: {this.state.resolveTime}</h3>
                    </div>
                    : null }
                  </div> 

                  <StaffRequired
                    heading={this.props.headings.heading_moreStaffBool} 
                    staffValue={this.state.staffRequired} 
                    changeHandler={this._changeStaffHandler} 
                  />

                  { this.state.staffRequired == "Yes" ?    
                  <React.Fragment>
                    <label className={styles.labelTitle}>{this.props.headings.heading_extraStaff}</label>
                    <ExtraStaff 
                      extraStaff={this.state.extraStaff} 
                      changeHandler={this._changeExtraStaffHandler}
                    />
                    
                    
                    <label className={styles.labelTitle}>{this.props.headings.heading_staffTime}</label>
                    <StaffTime 
                      staffTime={this.state.staffTime} 
                      changeHandler={this._changeStaffTimeHandler}
                    />
                  </React.Fragment>
                  : null }
                  
                </Stack>

                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <CompoundButton 
                        primary 
                        className={ this.colorSetSubmit() }
                        secondaryText="You can review before saving" 
                        disabled={this.SubmitOn()}
                        onClick={async()=>{
                          this.props.environment == "local" ? console.log("Local Submit") :                         
                            await sp.web.lists.getByTitle("ccsFormSubmit").items.add({
                              Title: this.props.userData._displayName,
                              Email: this.props.userData._email,
                              Jaid: this.state.offenderJAID,
                              Date: this.state.dateValue,
                              Time: this.state.timeValue,
                              Region: this.state.regionValue,
                              SubRegion: this.state.subRegionValue,
                              OrderType: this.state.orderType,
                              Subject: this.state.subjectValue,
                              Option: this.state.optionValue,
                              Comment: this.state.offenderNotes,
                              VisitRequired: this.state.visitRequired,
                              ResolveTime: this.state.resolveTime,
                              StaffRequired: this.state.staffRequired,
                              ExtraStaff: this.state.extraStaff,
                              StaffTime: this.state.staffTime
                            });
                        }}  
                      >
                        Submit Data
                      </CompoundButton>

                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <Toggle 
                        className={ styles.reviewToggle }
                        label="Review Form Data" 
                        checked={this.state.toggleValue}
                        onText="Show" 
                        offText="Hide" 
                        onChange={this._toggleChangeHandler} 
                      />
                    </div>
                  </div>
                </div>
              
              { this.state.toggleValue ? //displays form data (if needed) 
                <ReviewData
                  { ...this.props.headings }  
                  { ...this.state } 
                  env={this.props.environment}
                  user={this.props.userData._displayName} 
                  email={this.props.userData._email}
                />
              : null }

{/* */}{/* </div> */}
          </div>
        </div>

      </div> // wrapping container
    );
  }
}
