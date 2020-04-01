import * as React from 'react';
import styles from '../Ccs.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const ReviewData = (props:any) => {

  // Check if Submit button should be enabled
  const SubmitOn = ():boolean => {                              
    const checkJAIDLegth = props.offenderJAID.length <= 9 && props.offenderJAID != "" ? true : false;

    let staffExtra:boolean =  false;
      if(props.staffRequired == "Yes") {
        staffExtra = props.extraStaff ? true : false;
      } else {
        staffExtra = true;
      }

    let staffTime:boolean =  false;    
    if(props.staffRequired == "Yes") {
      staffTime = props.staffTime ? true : false;
    } else {
      staffTime = true;
    }

    return props.offenderJAID    &&
           props.dateValue       &&
           props.timeValue       &&
           props.regionValue     && 
           props.subRegionValue  &&
           props.orderType       &&
           props.subjectValue    &&
           props.optionValue     &&
           props.resolveTime     &&
           staffExtra            && 
           staffTime             && 
           checkJAIDLegth ? false : true;
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
          <label>{props.heading_moreStaffBool}</label>
          <p>{ props.staffRequired ? props.staffRequired : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
        </div>

        { props.staffRequired == "Yes" ?
        <React.Fragment>
          <div className={ styles.formDataWrap }> 
            <label>{props.heading_extraStaff}</label>
            <p>{ props.extraStaff ? props.extraStaff : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
          </div>

          <div className={ styles.formDataWrap }> 
            <label>{props.heading_staffTime}</label>
            <p>{ props.staffTime ? props.staffTime : <span style={{ color: 'red', fontWeight: 600 }}>Field not set</span>}</p>
          </div>
        </React.Fragment>
        : null }

      <PrimaryButton 
        className={ colorSetSubmit() }
        text="Submit Data"  
        disabled={SubmitOn()} 
        onClick={async()=>{
          props.env == "local" ? console.log("Local Submit") :                        
            await sp.web.lists.getByTitle("ccsFormSubmit").items.add({
              Title: props.user,
              Email: props.email,
              Jaid: props.offenderJAID,
              Date: props.dateValue,
              Time: props.timeValue,
              Region: props.regionValue,
              SubRegion: props.subRegionValue,
              OrderType: props.orderType,
              Subject: props.subjectValue,
              Option: props.optionValue,
              Comment: props.offenderNotes,
              VisitRequired: props.visitRequired,
              ResolveTime: props.resolveTime,
              StaffRequired: props.staffRequired,
              ExtraStaff: props.extraStaff,
              StaffTime: props.staffTime
            });
          }
        } 
      />
    </div>   
  );
};

export default ReviewData;