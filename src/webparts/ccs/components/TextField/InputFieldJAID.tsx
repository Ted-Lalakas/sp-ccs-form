import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const InputFieldJAID = (props) => {

  //Check if number
  const inputValue = !Number(props.jaid) ? "" : props.jaid;

  return (
    <React.Fragment>
      <TextField
        label="Offender JAID (number values only)"
        onChange={(ev, newValue) => props.changeHandler(newValue)}
        // styles={{ fieldGroup: { width: 300 } }}
        value={inputValue}
      />
    </React.Fragment>
  );
};

export default InputFieldJAID;