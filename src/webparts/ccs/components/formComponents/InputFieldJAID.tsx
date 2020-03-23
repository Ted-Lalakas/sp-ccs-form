import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const InputFieldJAID = (props:any) => {

  //Check if number
  const inputValue = !Number(props.jaid) ? "" : props.jaid;

  return (
    <React.Fragment>
      <TextField
        required
        label={props.heading}
        onChange={(ev, newValue) => props.changeHandler(newValue, "jaid")}
        // styles={{ fieldGroup: { width: 300 } }}
        value={inputValue}
        // errorMessage="Error message"
        onGetErrorMessage={(value) => {
          return inputValue.length <= 9 ? '' : `Length must be no more than 9. Actual length is ${inputValue.length}.`;
        }}
      />
    </React.Fragment>
  );
};

export default InputFieldJAID;