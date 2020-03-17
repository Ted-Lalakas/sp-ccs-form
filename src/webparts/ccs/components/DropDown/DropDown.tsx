import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};

const options: IDropdownOption[] = [
  { key: 'Bayside', text: 'Bayside Region', itemType: DropdownMenuItemType.Header },
  { key: 'Frankston', text: 'Frankston' },
  { key: 'Moorabin', text: 'Moorabin' },
  { key: 'Rosebud', text: 'Rosebud' }
];


const stackTokens: IStackTokens = { childrenGap: 20 };


const DropdownMain = (props) => {
  return (
    <Stack tokens={stackTokens}>
      <Dropdown 
        placeholder="Select an option" 
        label={props.placeholderText} 
        options={options} 
        styles={dropdownStyles}
        onChange={(ev, option) => props.changeHandler(option.text)}
        disabled={props.disabledValue}
      />
    </Stack>
  );
};

export default DropdownMain;