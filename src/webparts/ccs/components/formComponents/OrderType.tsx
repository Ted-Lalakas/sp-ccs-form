import * as React from 'react';
import { useState } from 'react';
import { Stack } from 'office-ui-fabric-react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from '../Ccs.module.scss';

const OrderType = (props:any) => {
  // uses Hook state to save a boolean value. Used to show/hide the text field
  const [showTextField, setTextField] = useState(false);

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { maxWidth: 350 },
  };

  // textfield: { fontSize: "14px" }

  const formatterArr: IDropdownOption[] = [];
  props.orderArray.forEach( val => {
    formatterArr.push({
      key: val,
      text: val
    });
  });

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Dropdown 
        required
        defaultSelectedKey={props.value}
        placeholder={props.placeholderText}
        label={props.heading}
        options={formatterArr} 
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

      { showTextField && props.value != null ?
      <TextField 
        className={styles.orderTypeText}
        placeholder={props.placeholderText}  
        styles={{ fieldGroup: { maxWidth: 350 } }}
        onChange={(ev, newValue) => props.changeHandler(newValue)}
        resizable={true}
        multiline rows={2}
      />
      : null }
    </Stack>
  );
};

export default OrderType;