import * as React from 'react';
import styles from '../Ccs.module.scss';

const ReviewData = (props:any) => {

  return (     
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ReviewData;