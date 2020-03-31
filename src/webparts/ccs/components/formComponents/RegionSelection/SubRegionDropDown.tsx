import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { maxWidth: 350 }
};

const SubRegionDropDown = (props:any) => {
  let formatterArr: IDropdownOption[] = [];

  if(props.regionValue) {
    let filteredArray = props.regionsArray.filter(val => val.Title == props.regionValue);

    filteredArray.forEach( val => {
      formatterArr.push({
        key: val.subRegion,
        text: val.subRegion
      });
     });

    formatterArr.unshift( {
      key: props.regionValue,
      text: props.regionValue,
      itemType: DropdownMenuItemType.Header
    });
  }

  return (
    <Dropdown 
      required
      label={props.heading}
      placeholder={props.placeholderText}
      options={formatterArr} 
      styles={dropdownStyles}
      onChange={(ev, option) => props.changeHandler(option.text)}
      disabled={props.disabledValue}
    />
  );
};

export default SubRegionDropDown;