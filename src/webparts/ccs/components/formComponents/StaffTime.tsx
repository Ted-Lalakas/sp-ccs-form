import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const StaffTime = (props:any) => {

  //Check if number
  const inputValue = !Number(props.staffTime) ? "" : props.staffTime;

  return (
    <React.Fragment>
      <TextField
        required
        label={props.heading}
        onChange={(ev, newValue) => props.changeHandler(newValue)}
        styles={{ fieldGroup: { width: 100 } }}
        value={inputValue}
      />
    </React.Fragment>
  );
};

export default StaffTime;