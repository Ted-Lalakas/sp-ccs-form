import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const InputFieldNotes = (props:any) => {
  return (
    <React.Fragment>
      <TextField
        label={props.heading}
        onChange={(ev, newValue) => props.changeHandler(newValue)}
        // styles={{ fieldGroup: { width: 450 } }}
        resizable={true}
        multiline rows={6}
      />
    </React.Fragment>
  );
};

export default InputFieldNotes;