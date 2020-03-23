import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


const dropdownStyles: Partial<IDropdownStyles> = {
  // dropdown: { width: 300 }
};

// const options: IDropdownOption[] = [
//   { key: 'Bayside', text: 'Bayside Region', itemType: DropdownMenuItemType.Header },
//   { key: 'Frankston', text: 'Frankston' },
//   { key: 'Moorabin', text: 'Moorabin' },
//   { key: 'Rosebud', text: 'Rosebud' }
// ];


const stackTokens: IStackTokens = { childrenGap: 20 };


const SubRegionDropDown = (props) => {
  let filteredValues = [];
  let formatterArr: IDropdownOption[] = [];

  if(props.regionValue) {
    let filteredArray = props.regionsArray.filter(val => val.regions == props.regionValue);
    filteredValues = [...filteredArray[0].subRegions];

    filteredValues.forEach( val => {
      formatterArr.push({
        key: val.Option_x0020_Value,
        text: val.Option_x0020_Value
      });
     });

    formatterArr.unshift( {
      key: filteredValues[0].Title,
      text: filteredValues[0].Title,
      itemType: DropdownMenuItemType.Header
    });
  }

  return (
    <Stack tokens={stackTokens}>
      <Dropdown 
        required
        label={props.heading}
        placeholder={props.placeholderText}
        options={formatterArr} 
        styles={dropdownStyles}
        onChange={(ev, option) => props.changeHandler(option.text)}
        disabled={props.disabledValue}
      />
    </Stack>
  );
};

export default SubRegionDropDown;