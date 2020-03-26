import * as React from 'react';
import { useState } from 'react';
import { Stack } from 'office-ui-fabric-react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const OrderType = (props:any) => {

  // uses Hook state to save a boolean value. Used to show/hide the text field
  const [showTextField, setTextField] = useState(false);

  const dropdownStyles: Partial<IDropdownStyles> = {
    // dropdown: { width: 300 }
  };
  
  const options: IDropdownOption[] = [
    { key: 'CCO (inc. CW)', text: 'CCO (inc. CW)'},
    { key: 'Parole', text: 'Parole' },
    { key: 'Supervision', text: 'Supervision' },
    { key: 'Other', text: 'Other' }
  ];

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Dropdown 
        required
        placeholder={props.placeholderText}
        label={props.heading}
        options={options} 
        styles={dropdownStyles}
        onChange={(ev, option) => {
          if(option.text == "Other") {
            setTextField(true);
            props.changeHandler("");
          } else {
            setTextField(false);
            props.changeHandler(option.text);
          }
        }} 
      />

      { showTextField ?
      <TextField 
        onChange={(ev, newValue) => props.changeHandler(newValue)}
      />
      : null }
    </Stack>
  );
};

export default OrderType;