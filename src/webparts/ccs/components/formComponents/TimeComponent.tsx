import * as React from 'react';
import styles from '../Ccs.module.scss';
import { useState } from 'react';
import TimeKeeper from 'react-timekeeper';
import { PrimaryButton } from 'office-ui-fabric-react';

const TimeComponent = (props:any) => {

  const formatAMPM = (date):string => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ampm;
    return strTime;
  };

  const [time, setTime] = useState(formatAMPM(new Date));
  const [showTime, setShowTime] = useState(false);

  return (
    <React.Fragment>
      <PrimaryButton
        className={ props.timeValue ? styles.timeButtonSet : styles.timeButtonUnset }  
        onClick={() => setShowTime(!showTime)}
        toggle
        checked={showTime}
        text={showTime ? 'Click to close' : props.heading} 
      />

    { showTime ? 
      <div style={{ 
        textAlign: 'center', 
        position: 'absolute',
        zIndex: 100,
        top: 40,
        left: 0
      }} >
        <TimeKeeper
          time={time}
          onChange={(newTime) => setTime(newTime.formatted24)}
          switchToMinuteOnHourSelect={true}
          closeOnMinuteSelect={true}
          hour24Mode={true}
          doneButton={(newTime) => (
            <div
              style={{ textAlign: 'center', padding: '10px 0' }}
              onClick={() => {
                setTime(newTime.formatted24);
                props.changeHandler(time);
                setShowTime(!showTime);
              }}>Set Time</div>
          )}
        />
      </div>
    : null }
    </React.Fragment>
  );
};

export default TimeComponent;