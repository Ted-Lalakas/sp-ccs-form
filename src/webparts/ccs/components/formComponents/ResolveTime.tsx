import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

const ResolveTime = (props:any) => {

  //Check if number
  const inputValue = !Number(props.resolveTime) ? "" : props.resolveTime;

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm6 ms-md5 ms-lg4">
        <TextField
          required
          onChange={(ev, newValue) => props.changeHandler(newValue)}
          styles={{ fieldGroup: { width: 70 } }}
          value={inputValue}
        />
      </div>
      <div className="ms-Grid-col ms-sm6 ms-md7 ms-lg8">
        <Slider
          max={30}
          value={inputValue}
          onChange={(value: number) => props.changeHandler(value)}
          showValue={true}
        />
      </div>
    </div>
  );
};

export default ResolveTime;