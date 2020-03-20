import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const InputFieldName = (props) => {
  return (
    <React.Fragment>
      <TextField
        required
        label="Offender Name"
        onChange={(ev, newValue) => props.changeHandler(newValue)}
        // styles={{ fieldGroup: { width: 300 } }}
      />
    </React.Fragment>
  );
};

export default InputFieldName;