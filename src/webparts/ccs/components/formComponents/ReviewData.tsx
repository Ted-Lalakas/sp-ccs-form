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
      otherValueSet ? false : true;  
    return disableSubmitButton;
  };

  // Set the color styling for the submit button (just styling)
  const colorSetSubmit = ():any => {
    const valueStyle = SubmitOn() ? styles.reviewSubmitOff : styles.reviewSubmitOn;
    return valueStyle;
  };

  return (
    <div className={ styles.formDisplayData }>  
      
      <div className={styles.reviewHead} >            
        <h2>{props.heading_dutyDirector}</h2>
        <span>{props.user} ({props.email})</span>
      </div>

      { props.offenderJAID ? 
        <div className={ styles.formDataWrap }>
          <label>{props.heading_jaid}</label>
          <p>{props.offenderJAID}</p>
        </div>
      : null }

      { props.dateValue ?
        <div className={ styles.formDataWrap }>
          <label>{props.heading_dateField}</label>
          <p>{props.dateValue}</p>
        </div>
      : null }

      { props.timeValue ?
        <div className={ styles.formDataWrap }>
          <label>{props.heading_timeofCall}</label>
          <p>{props.timeValue}</p>
        </div>
      : null }

      { props.regionValue ? 
        <div className={ styles.formDataWrap }>
          <label>{props.heading_regionalLocation}</label>
          <p>{props.regionValue}</p>
        </div>
      : null }

      { props.subRegionValue ? 
        <div className={ styles.formDataWrap }>
          <label>{props.heading_subRegion}</label>
          <p>{props.subRegionValue}</p>
        </div>
      : null }

      { props.orderType ? 
        <div className={ styles.formDataWrap }> 
          <label>{props.heading_orderType}</label>
          <p>{props.orderType}</p>
        </div>
      : null }

      { props.subjectValue ? 
        <div className={ styles.formDataWrap }> 
          <label>{props.heading_subject}</label>
          <p>{props.subjectValue}</p>
        </div>
      : null }

      { props.optionValue ? 
        <div className={ styles.formDataWrap }> 
          <label>{props.heading_option}</label>
          <p>{props.optionValue}</p>
        </div>
      : null }

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

      { props.resolveTime ? 
        <div className={ styles.formDataWrap }> 
          <label>{props.heading_resolveTime}</label>
          <p>{props.resolveTime}</p>
        </div>
      : null }

      { props.extraStaff ? 
        <div className={ styles.formDataWrap }> 
          <label>{props.heading_extraStaff}</label>
          <p>{props.extraStaff}</p>
        </div>
      : null }

      { props.staffTime ? 
        <div className={ styles.formDataWrap }> 
          <label>{props.heading_staffTime}</label>
          <p>{props.staffTime}</p>
        </div>
      : null }

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