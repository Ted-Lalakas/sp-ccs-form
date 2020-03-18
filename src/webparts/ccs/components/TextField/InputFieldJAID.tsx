import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const InputFieldJAID = (props) => {
  return (
    <React.Fragment>
      <TextField
        label="Offender JAID"
        onChange={(ev, newValue) => props.changeHandler(newValue)}
        // styles={{ fieldGroup: { width: 300 } }}
      />
    </React.Fragment>
  );
};

export default InputFieldJAID;