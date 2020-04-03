import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import styles from './Ccs.module.scss';
import { ICcsProps, ICcsState } from './ICcsProps';

// Fabric Components
import { Stack, DatePicker, CompoundButton, PrimaryButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

// Custom Components
import InputFieldJAID from './formComponents/InputFieldJAID';
import TimeComponent from './formComponents/TimeComponent';
import RegionDropDown from './formComponents/RegionSelection/RegionDropDown';
import SubRegionDropDown from './formComponents/RegionSelection/SubRegionDropDown';
import OrderType from './formComponents/OrderType';
import SubjectDropDown from './formComponents/IssuesInformation/SubjectDropDown';
import OptionDropDown from './formComponents/IssuesInformation/OptionDropDown';
import ExtraStaff from './formComponents/ExtraStaff';
import StaffTime from './formComponents/StaffTime';
import ReviewData from './formComponents/ReviewData';

export default class Ccs extends React.Component<ICcsProps, ICcsState> {
  constructor(props:any) {
    super(props);

    // console.log("-------------------------------------------------------------------------");
    // console.log("[ProcurementNavigator.tsx] CONSTRUCTOR",this.props);
    // console.log("-------------------------------------------------------------------------");

    // State handles variable changes and will be used by submit to store the data
    this.state = {
      offenderJAID: "",
      dateValue: "",
      dateValue2: null,
      timeValue: null,
      regionValue: null,
      subRegionValue: null,
      orderType: null,
      subjectValue: null,
      optionValue: null,
      offenderNotes: "",
      visitRequired: "No",
      resolveTime: "",
      staffRequired: "No",
      extraStaff: null,
      staffTime: null,
      toggleValue: false,
      successMessage: false
    };
  }
  // For testing purposes. Can be removed.
  // public componentDidMount() {
  //   console.log("-------------------------------------------------------------------------");
  //   console.log('[Ccs.tsx] componentDidMount',this.props);
  //   console.log("-------------------------------------------------------------------------");
  // }

  // For testing purposes. Can be removed.
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

  // Region Drop-down
  public _changeRegionHandler = (value:string) => {
    this.setState({ regionValue: value });
    this.setState({ subRegionValue: null });
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
    this.setState({ optionValue: null });
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

  public _successMessageHandler = () => {
    this.setState({ successMessage: !this.state.successMessage });
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

  // Set the color styling for the submit button (just styling)
  public colorSetReviewSubmit = ():any => {
    return this.SubmitOn() ? styles.reviewSubmitOff : styles.reviewSubmitOn;
  }

  public render(): React.ReactElement<ICcsProps> {

    const optionsVisitRequired: IChoiceGroupOption[] = [
      { key: 'Yes', text: 'Yes', iconProps: { iconName: 'Car' } },
      { key: 'No', text: 'No', iconProps: { iconName: 'Telemarketer' } }
    ];

    const optionsStaffRequired: IChoiceGroupOption[] = [
      { key: 'Yes', text: 'Yes', iconProps: { iconName: 'Group' } },
      { key: 'No', text: 'No', iconProps: { iconName: 'BlockContact' } }
    ];
    
    const submitHandler = async () => {
      if(this.props.environment == "local") {
        console.log("Local Submit: Worked");
        this.setState({
          offenderJAID: "",
          dateValue: "",
          dateValue2: null,
          timeValue: null,
          regionValue: null,
          subRegionValue: null,
          orderType: null,
          subjectValue: null,
          optionValue: null,
          offenderNotes: "",
          visitRequired: "No",
          resolveTime: "",
          staffRequired: "No",
          extraStaff: null,
          staffTime: null,
          toggleValue: false,
          successMessage: true
        });
      } else {                   
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

          this.setState({
            offenderJAID: "",
            dateValue: "",
            dateValue2: null,
            timeValue: null,
            regionValue: null,
            subRegionValue: null,
            orderType: null,
            subjectValue: null,
            optionValue: null,
            offenderNotes: "",
            visitRequired: "No",
            resolveTime: "",
            staffRequired: "No",
            extraStaff: null,
            staffTime: null,
            toggleValue: false,
            successMessage: true
          });
        }
    };

    const showModalBackground = [styles.modalBackground, this.state.successMessage ? styles.modalMessageShow : styles.modalMessageHide];
    const showModal = [styles.modal, this.state.successMessage ? styles.modalMessageShow : styles.modalMessageHide];

    return (
      <div className={ styles.ccs }>
        <React.Fragment>
          <div className={showModalBackground.join(' ')}/>
          <div className={showModal.join(' ')}>
            <p>Form has been submitted</p>
            <PrimaryButton 
              text="Close"
              onClick={this._successMessageHandler} 
            />                
          </div> 
        </React.Fragment>

        <div className={ styles.container }>
          <div className={ styles.row }>
    {/* */} <div className={ styles.column }>
              <span className={ styles.title }>{escape(this.props.headings.titleValue)}</span>
              <p className={ styles.description }>{escape(this.props.headings.description)}</p>
    {/* */}</div>
          </div>
        </div>

        <div className={ styles.container }>
          <div className={ styles.row2 }>
    {/* */} <div className={ styles.column }>
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
                />
              </Stack>

                <div style={{ position: 'relative', marginTop: '2em' }} >
                    <TimeComponent 
                      timeValue={this.state.timeValue} 
                      changeHandler={this._changeTimeHandler} 
                      heading={this.props.headings.heading_timeofCall}
                      />
                  { this.state.timeValue ?
                  <div className={styles.timeSetHeaderWrap}>
                    <h3 className={styles.timeFieldLabel}>Time set: {this.state.timeValue}</h3>
                  </div>
                  : null }
                </div>      

                <div style={{ marginTop: '2em', marginBottom: '2em' }}>  
                <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }> 
                  <RegionDropDown 
                    heading={this.props.headings.heading_regionalLocation}
                    placeholderText={this.props.headings.placeholder_regionalLocation}
                    changeHandler={this._changeRegionHandler}
                    regionsUnique={this.props.regionsUnique}
                    value={this.state.regionValue} 
                  />

                  <SubRegionDropDown
                    heading={this.props.headings.heading_subRegion} 
                    placeholderText={this.props.headings.placeholder_subRegion}
                    disabledValue={!this.state.regionValue ? true : false} 
                    changeHandler={this._changeSubRegionHandler} 
                    regionsArray={this.props.regionsAll} 
                    regionValue={this.state.regionValue}
                    value={this.state.subRegionValue} 
                  />
                </Stack>
                </div>

                <OrderType 
                  heading={this.props.headings.heading_orderType} 
                  placeholderText={this.props.headings.placeholder_orderType} 
                  changeHandler={this._changeOrderTypeHandler}
                  orderArray={this.props.ordersAll} 
                  value={this.state.orderType} 
                />

                <div style={{ marginTop: '2em', marginBottom: '2em' }}>  
                <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }>     
                  <SubjectDropDown
                    heading={this.props.headings.heading_subject}
                    placeholderText={this.props.headings.placeholder_subject}
                    changeHandler={this._changeSubjectHandler}
                    subjectArray={this.props.subjectsUnique}
                    value={this.state.subjectValue} 
                  />

                  <OptionDropDown
                    heading={this.props.headings.heading_option} 
                    placeholderText={this.props.headings.placeholder_option}
                    disabledValue={!this.state.subjectValue ? true : false} 
                    changeHandler={this._changeOptionHandler} 
                    callSubjectArray={this.props.subjectsAll} 
                    subjectValue={this.state.subjectValue}
                    value={this.state.optionValue} 
                  />
                </Stack>
                </div>

                <Stack tokens={{ childrenGap: 15 }} className={ styles.stackWrapper }>
                  <TextField
                    defaultValue={this.state.offenderNotes}
                    label={this.props.headings.heading_comment}
                    onChange={(ev, newValue) => this._offenderNotesHandler(newValue)}
                    styles={{ fieldGroup: { maxWidth: 350 } }}
                    resizable={true}
                    multiline rows={6}
                  />

                  <ChoiceGroup 
                    selectedKey={this.state.visitRequired} 
                    label={this.props.headings.heading_visitRequired} 
                    options={optionsVisitRequired} 
                    onChange={(ev, option) => this._changeVisitHandler(option.key)} 
                  />

                  <div style={{ position: 'relative', marginTop: '2em', marginBottom: '1em' }} >
                      <TimeComponent 
                        timeValue={this.state.resolveTime}
                        changeHandler={this._changeResolveTimeHandler}
                        heading={this.props.headings.heading_resolveTime}
                        />
                    { this.state.resolveTime ?
                    <div className={styles.timeSetHeaderWrap}>
                      <h3 className={styles.timeFieldLabel}>Time set: {this.state.resolveTime}</h3>
                    </div>
                    : null }
                  </div> 

                  <ChoiceGroup 
                    selectedKey={this.state.staffRequired} 
                    label={this.props.headings.heading_moreStaffBool} 
                    options={optionsStaffRequired} 
                    onChange={(ev, option) => this._changeStaffHandler(option.key)} 
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
                        className={this.colorSetSubmit()}
                        secondaryText={this.props.headings.SubmitButton1Extra} 
                        disabled={this.SubmitOn()}
                        onClick={submitHandler}  
                      >
                        {this.props.headings.SubmitButton1}
                      </CompoundButton>

                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                      <Toggle 
                        className={ styles.reviewToggle }
                        label={this.props.headings.ReviewFormToggle} 
                        checked={this.state.toggleValue}
                        onText="Show" 
                        offText="Hide" 
                        onChange={this._toggleChangeHandler} 
                      />
                    </div>
                  </div>
                </div>
              
              { this.state.toggleValue ? //displays form data (if needed) 
              <div className={ styles.formDisplayData }> 
                <ReviewData
                  { ...this.props.headings }  
                  { ...this.state } 
                  env={this.props.environment}
                  user={this.props.userData._displayName} 
                  email={this.props.userData._email}
                />
                <PrimaryButton 
                  text={this.props.headings.SubmitButton2}
                  className={this.colorSetReviewSubmit()}
                  disabled={this.SubmitOn()}
                  onClick={submitHandler} 
                />
              </div>  
              : null }

    {/* */}</div>
          </div>
        </div>

      </div> // wrapping container
    );
  }
}
