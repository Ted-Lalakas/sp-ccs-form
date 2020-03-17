import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const InputField = (props) => {
  return (
    <React.Fragment>
      <TextField
        label="Nested Controlled TextField"
        onChange={(ev, newValue) => props.changeHandler(newValue)}
        styles={{ fieldGroup: { width: 300 } }}
      />
    </React.Fragment>
  );
};

export default InputField;