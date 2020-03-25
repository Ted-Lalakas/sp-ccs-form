import * as React from 'react';
import styles from '../Ccs.module.scss';

const ReviewData = (props:any) => {
  console.log(props);
  return (
    <div className={ styles.formDisplayData }>  
      
      <div className={styles.reviewHead} >            
        <h3>{props.heading_dutyDirector} <span>{props.user} ({props.email})</span></h3>
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

    </div>   
  );
};

export default ReviewData;