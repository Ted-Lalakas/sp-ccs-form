import * as React from 'react';
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
    <div style={{ position: 'relative' }} >
      <PrimaryButton  
        onClick={() => setShowTime(!showTime)}
        toggle
        checked={showTime}
        text={showTime ? 'Click to close' : 'Time of call'} 
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
    </div>
  );
};

export default TimeComponent;