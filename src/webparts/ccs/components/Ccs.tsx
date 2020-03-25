import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Ccs.module.scss';
import { ICcsProps, ICcsState } from './ICcsProps';

import { Stack, DatePicker, DefaultButton } from 'office-ui-fabric-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { getRegionArrayData, getSubRegionArrayData } from './formComponents/RegionSelection/arrayFunctions';
import { getSubjectArrayData, getOptionArrayData } from './formComponents/IssuesInformation/arrayFunctions';

// Custom components
import InputFieldJAID from './formComponents/InputFieldJAID';
import InputFieldNotes from './formComponents/InputFieldNotes';
import RegionDropDown from './formComponents/RegionSelection/RegionDropDown';
import SubRegionDropDown from './formComponents/RegionSelection/SubRegionDropDown';
import TimeComponent from './formComponents/TimeComponent';
import VisitRequired from './formComponents/VisitRequired';
import ReviewData from './formComponents/ReviewData';
import OrderType from './formComponents/OrderType';
import SubjectDropDown from './formComponents/IssuesInformation/SubjectDropDown';
import OptionDropDown from './formComponents/IssuesInformation/OptionDropDown';

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
      offenderNotes: "",
      visitRequired: "No", 
      toggleValue: false,
      subjectValue: "",
      optionValue: ""
    };
  }

  // Grab the array of data and run functions that separate the data
  private regionsArray:{} = getRegionArrayData(this.props.regionsData);
  private subRegionArray:{} = getSubRegionArrayData(this.props.regionsData);

  // Grab the array of data and run functions that separate the data
  private subjectArray:{} = getSubjectArrayData(this.props.callSubjectData);
  // private optionArray:{} = this.props.callSubjectData;

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
  // public componentDidUpdate() {
  //   console.log("-------------------------------------------------------------------------");
  //   console.log('[Ccs.tsx] componentDidUpdate - STATE',this.state);
  //   console.log("-------------------------------------------------------------------------");
  // }

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

  // Subject Drop-down
  public _changeSubjectHandler = (value) => {
    this.setState({ subjectValue: value });
  }

  // Option Drop-down
  public _changeOptionHandler = (value) => {
    this.setState({ optionValue: value });
  }

  // Region Drop-down
  public _changeRegionHandler = (value) => {
    this.setState({ regionValue: value });
    this.setState({ subRegionValue: "" });
  }

  // Sub-Region Drop-Down
  public _changeSubRegionHandler = (value) => {
    this.setState({ subRegionValue: value });
  }

  // Order Type Drop-Down
  public _changeOrderTypeHandler = (value) => {
    this.setState({ orderType: value });
  }

  // Notes
  public _offenderNotesHandler = (value:string) => {
    this.setState({ offenderNotes: value });
  }

  // Visit Boolean
  public _changeVisitHandler = (value) => {
    this.setState({ visitRequired: value });
  }

  // Review Data Toggle
  public _toggleChangeHandler = () => {
    this.setState({ toggleValue: !this.state.toggleValue });
  }

  // Check if Submit button should be enabled
  public fieldFilled = ():boolean => {
    const valueReturned = !this.state.offenderJAID    ||
      !this.state.regionValue     || 
      !this.state.subRegionValue  || 
      !this.state.dateValue ? true : false;
    return valueReturned;
  }

  // Set the color styling for the submit button (just styling)
  public colorSetSubmit = (): any => {
    const valueStyle = this.fieldFilled() ? styles.submitButtonOff : styles.submitButtonOn;
    return valueStyle;
  }

  public render(): React.ReactElement<ICcsProps> {
    return (
      <div className={ styles.ccs }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{escape(this.props.titleValue)}</span>
              <p className={ styles.description }>{escape(this.props.description)}</p>
            </div>
          </div>
        </div>

        <div className={ styles.container }>
          <div className={ styles.row2 }>
            <div className={ styles.column }>

              <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }>

                <InputFieldJAID 
                  heading={this.props.headings.heading_jaid}
                  jaid={this.state.offenderJAID} 
                  changeHandler={this._offenderJAIDHandler} 
                />

                <DatePicker 
                  ariaLabel={this.props.headings.heading_dateField} 
                  label={this.props.headings.heading_dateField}
                  placeholder={this.props.headings.placeholder_dateField}
                  onSelectDate={this._onFormatDate}
                  value={this.state.dateValue2!}
                  allowTextInput={false}
                  isRequired={true}
                />

                <div style={{ marginTop: '1em' }} className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    <TimeComponent changeHandler={this._changeTimeHandler} />
                  </div>
                  { this.state.timeValue ?
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                    <h3 className={styles.timeFieldLabel}>Time set: {this.state.timeValue}</h3>
                  </div>
                  : null }
                </div>      

                <RegionDropDown 
                  heading={this.props.headings.heading_regionalLocation}
                  placeholderText={this.props.headings.placeholder_regionalLocation}
                  changeHandler={this._changeRegionHandler}
                  regionsArray={this.regionsArray} 
                />

                <SubRegionDropDown
                  heading={this.props.headings.heading_subRegion} 
                  placeholderText={this.props.headings.placeholder_subRegion}
                  disabledValue={!this.state.regionValue ? true : false} 
                  changeHandler={this._changeSubRegionHandler} 
                  regionsArray={this.subRegionArray} 
                  regionValue={this.state.regionValue}
                />

                <OrderType 
                  heading={this.props.headings.heading_orderType} 
                  placeholderText={this.props.headings.placeholder_orderType} 
                  changeHandler={this._changeOrderTypeHandler}
                  orderType={this.state.orderType}
                />

                <SubjectDropDown
                  heading={this.props.headings.heading_regionalLocation}
                  placeholderText={this.props.headings.placeholder_regionalLocation}
                  changeHandler={this._changeSubjectHandler}
                  subjectArray={this.subjectArray}
                />

                <OptionDropDown
                  heading={this.props.headings.heading_subRegion} 
                  placeholderText={this.props.headings.placeholder_subRegion}
                  disabledValue={!this.state.subjectValue ? true : false} 
                  changeHandler={this._changeOptionHandler} 
                  callSubjectArray={this.props.callSubjectData} 
                  subjectValue={this.state.subjectValue}
                />

                <InputFieldNotes changeHandler={this._offenderNotesHandler} />
                
                <VisitRequired 
                  visitValue={this.state.visitRequired} 
                  visitHandler={this._changeVisitHandler} 
                />

                <div className="ms-Grid" dir="ltr">
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
                        onChange={this._toggleChangeHandler} 
                      />
                    </div>
                  </div>
                </div>

              </Stack>
              
              { this.state.toggleValue ? //displays form data (if needed) 
                <ReviewData 
                  { ...this.props.headings } 
                  { ...this.state } 
                  user={this.userName} 
                  email={this.userEmail} 
                />
              : null }

            </div>
          </div>
        </div>

      </div> // wrapping container
    );
  }
}
