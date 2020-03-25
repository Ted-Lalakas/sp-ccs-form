import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const ExtraStaff = (props:any) => {

  //Check if number
  const inputValue = !Number(props.extraStaff) ? "" : props.extraStaff;

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

export default ExtraStaff;