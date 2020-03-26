import * as React from 'react';
import styles from '../Ccs.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react';

const ReviewData = (props:any) => {
  // Check if Submit button should be enabled
  const SubmitOn = ():boolean => {
    const otherValueSet:boolean = props.optionValue != "Other" 
                                    ? true 
                                    : props.optionValue == "Other" && props.optionOtherValue != "" 
                                      ? true 
                                      : false;

    const checkJAIDLegth = props.offenderJAID.length <= 9 ? true : false;

    const disableSubmitButton = 
      props.offenderJAID    &&
      props.dateValue       &&
      props.timeValue       &&
      props.regionValue     && 
      props.subRegionValue  &&
      props.orderType       &&
      props.subjectValue    &&
      props.optionValue     &&
      props.resolveTime     &&
      props.extraStaff      &&
      props.staffTime       &&
      checkJAIDLegth        && 
      otherValueSet ? false : true;  
    return disableSubmitButton;
  };

  // Set the color styling for the submit button (just styling)
  const colorSetSubmit = ():any => {
    return SubmitOn() ? styles.reviewSubmitOff : styles.reviewSubmitOn;
  };

  return (
    <div className={ styles.formDisplayData }>  
      
      <div className={styles.reviewHead} >            
        <h2>{props.heading_dutyDirector}</h2>
        <span>{props.user} ({props.email})</span>
      </div>

       
        <div className={ styles.formDataWrap }>
          <label>{props.heading_jaid}</label>
          <p>{ props.offenderJAID ? props.offenderJAID : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }>
          <label>{props.heading_dateField}</label>
          <p>{ props.dateValue ? props.dateValue : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }>
          <label>{props.heading_timeofCall}</label>
          <p>{ props.timeValue ? props.timeValue : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }>
          <label>{props.heading_regionalLocation}</label>
          <p>{ props.regionValue ? props.regionValue : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>
 
        <div className={ styles.formDataWrap }>
          <label>{props.heading_subRegion}</label>
          <p>{ props.subRegionValue ? props.subRegionValue : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }> 
          <label>{props.heading_orderType}</label>
          <p>{ props.orderType ? props.orderType : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }> 
          <label>{props.heading_subject}</label>
          <p>{ props.subjectValue ? props.subjectValue : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }> 
          <label>{props.heading_option}</label>
          <p>{ props.optionValue ? props.optionValue : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        { props.offenderNotes ? 
        <div className={ styles.formDataWrap }> 
          <label>{props.heading_comment}</label>
          <p>{props.offenderNotes}</p>
        </div>
      : null }

      <div className={ styles.formDataWrap }> 
        <label>{props.heading_visitRequired}</label>
        <p>{props.visitRequired}</p>
      </div>

        <div className={ styles.formDataWrap }> 
          <label>{props.heading_resolveTime}</label>
          <p>{ props.resolveTime ? props.resolveTime : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }> 
          <label>{props.heading_extraStaff}</label>
          <p>{ props.extraStaff ? props.extraStaff : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        <div className={ styles.formDataWrap }> 
          <label>{props.heading_staffTime}</label>
          <p>{ props.staffTime ? props.staffTime : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

      <PrimaryButton 
        className={ colorSetSubmit() }
        text="Submit Data" 
        onClick={() => alert("Its clicked!")}  
        disabled={SubmitOn()} 
      />
    </div>   
  );
};

export default ReviewData;